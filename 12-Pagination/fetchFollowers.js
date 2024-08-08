const url = 'https://api.github.com/users/john-smilga/followers?per_page=100';

const fetchFollowers = async () => {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchFollowers;
