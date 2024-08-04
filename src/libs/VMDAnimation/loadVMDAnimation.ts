import { VRM } from '@pixiv/three-vrm';

import { convert } from '@/libs/VMDAnimation/vmd2vrmanim';
import { bindToVRM, toOffset } from '@/libs/VMDAnimation/vmd2vrmanim.binding';

export async function loadVMDAnimation(url: string, vrm: VRM) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  const animation = convert(buffer, toOffset(vrm));
  const clip = bindToVRM(animation, vrm);

  return clip ?? null;
}
