// Mixamo Animation downloadeer
// The following script make use of mixamo2 API to download all anims for a single character that you choose.
// The animations are saved with descriptive long names instead of the short ones used by default by mixamo UI.
//
//  This script has been written by gnuton@gnuton.org and the author is not responsible of its usage
//
//  How to use this script
//  1. Browse mixamo.com
//  2. Log in
//  3. Open JS console (F12 on chrome)
//  4. Download an animation and get the character ID from the Network tab
//  5. Then past the character id in the "character" variable at beginning of this script
//  6. Copy and paste the full script in the mixamo.com javascript console
//  7. The script will open a new blank page.. you  will start to see animations downloading
//  8. keep the blank page opened and keep on pressing "Allow multiple downlaods"

// NOTE. This doesn't really work for me, but it was supposed too
// Chrome will ask you all the time to allow multiple downloads
// You can disable this as follow:
// chrome://settings/ > Advanced > Content > Automatic downloads > uncheck "Do not allow any site to download multiple file automatically"

// CHANGE THIS VAR TO DOWNLOAD ANIMATIONS FOR A DIFFERENT CHARACTER
// const character = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
const character = '2dee24f8-3b49-48af-b735-c6377509eaac';

//=================================================================================================

const bearer = localStorage.access_token;

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const getAnimationList = (page) => {
  console.log('getAnimationList page=', page);
  const init = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`,
      'X-Api-Key': 'mixamo2',
    },
  };

  const listUrl = `https://www.mixamo.com/api/v1/products?page=${page}&limit=96&order=&type=Motion%2CMotionPack&query=`;
  return fetch(listUrl, init)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => {
      throw 'Failed to download animation list';
    });
};

// retrieves json.details.gms_hash
const getProduct = (animId, character) => {
  console.log('getProduct animId=', animId, 'character=', character);
  const init = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`,
      'X-Api-Key': 'mixamo2',
    },
  };

  const productUrl = `https://www.mixamo.com/api/v1/products/${animId}?similar=0&character_id=${character}`;
  return fetch(productUrl, init)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => {
      throw 'Failed to download product details';
    });
};

const downloadAnimation = (animId, character, product_name) => {
  console.log(
    'downloadAnimation animId=',
    animId,
    'character=',
    character,
    'prod name=',
    product_name,
  );
  // skip packs
  if (product_name.includes(',')) {
    console.log('Skipping pack', product_name);
    return Promise.resolve('Skip pack!');
  } else {
    return getProduct(animId, character)
      .then((json) => json.details.gms_hash)
      .then((gms_hash) => {
        const pvals = gms_hash.params.map((param) => param[1]).join(',');
        const _gms_hash = Object.assign({}, gms_hash, { params: pvals }); // Anim is baked with default param values
        return exportAnimation(character, [_gms_hash], animId);
      })
      .then((json) => monitorAnimation(character))
      .catch(() => {
        throw 'Unable to download animation ' + animId;
      });
  }
};

const downloadAnimLoop = (o) => {
  console.log('downloadAnimLoop');
  if (!o.anims.length) {
    return downloadAnimsInPage(o.currentPage + 1, o.totPages, o.character); // no anims left, get a new page
  }

  const head = o.anims[0];
  const tail = o.anims.slice(1);
  o.anims = tail;

  return downloadAnimation(head.id, o.character, head.description)
    .then(() => sleep(2000))
    .then(() => downloadAnimLoop(o)) //loop
    .catch(() => {
      console.log('Recovering from animation failed to downlaod');
      return downloadAnimLoop(o); // keep on looping
    });
};

const downloadAnimsInPage = (page, totPages, character) => {
  console.log('downloadAnimsInPage page=', page, 'totPages', totPages, 'character=', character);
  if (page >= totPages) {
    console.log('All pages have been downloaded');
    return Promise.resolve('All pages have been downlaoded');
  }

  return (
    getAnimationList(page)
      .then((json) => ({
        anims: json.results,
        currentPage: json.pagination.page,
        totPages: json.pagination.num_pages,
        character,
      }))
      .then((o) => downloadAnimLoop(o))
      // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject
      .catch((e) => Promise.reject('Unable to download all animations error ', e))
  );
};

const start = () => {
  console.log('start');
  if (!character) {
    console.error('Please add a valid character ID at the beginnig of the script');
    return;
  }
  downloadAnimsInPage(1, 100, character);
};

const exportAnimation = (character_id, gmsHashArray, product_name) => {
  console.log('Exporting Anim´:' + character_id + ' to file:' + product_name);
  const exportUrl = 'https://www.mixamo.com/api/v1/animations/export';
  const exportBody = {
    character_id,
    gms_hash: gmsHashArray, //[{ "model-id": 103120902, "mirror": false, "trim": [0, 100], "overdrive": 0, "params": "0,0,0", "arm-space": 0, "inplace": false }],
    preferences: { format: 'fbx7', skin: 'false', fps: '30', reducekf: '0' }, // To download collada use format: "dae_mixamo"
    product_name,
    type: 'Motion',
  };
  const exportInit = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`,
      'X-Api-Key': 'mixamo2',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(exportBody),
  };
  return fetch(exportUrl, exportInit)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => {
      throw 'Failed to export animation';
    });
};

const monitorAnimation = (characterId) => {
  const monitorUrl = `https://www.mixamo.com/api/v1/characters/${characterId}/monitor`;
  const monitorInit = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`,
      'X-Api-Key': 'mixamo2',
    },
  };
  return fetch(monitorUrl, monitorInit)
    .then((res) => {
      switch (res.status) {
        case 404: {
          {
            const errorMsg =
              'ERROR: Monitor got 404 error: ' + res.error + ' message=' + res.message;
            console.error(errorMsg);
            throw new Error(errorMsg);
          }
        }
        case 202:
        case 200: {
          {
            return res.json();
          }
        }
        default: {
          throw new Error('Response not handled', res);
        }
      }
    })
    .then((msg) => {
      switch (msg.status) {
        case 'completed': {
          console.log('Downloading:', msg.job_result);
          downloadingTab.location.href = msg.job_result;
          return msg.job_result;
        }
        case 'processing': {
          console.log('Animation is processing... looping');
          return monitorAnimation(characterId);
        } // loop
        default: {
          const errorMsg =
            'ERROR: Monitor status:' +
            msg.status +
            ' message:' +
            msg.message +
            'result:' +
            JSON.stringify(msg.job_result);
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
      }
    })
    .catch((e) => {
      throw 'Unable to monitor job for character ' + characterId + e;
    });
};

// Workaround for downloading files from a promise
// NOTE that chrome will detect you are downloading multiple files in a single TAB. Please allow it!
const downloadingTab = window.open('', '_blank');

start();
