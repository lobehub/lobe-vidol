export const upload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    body: formData,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return res.json();
};
