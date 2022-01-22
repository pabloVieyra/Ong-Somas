import axios from 'axios';

const MEMBERS_URL = process.env.REACT_APP_MEMBERS_URL;

const getAllMembers = async () => {
  try {
    const res = await axios.get(MEMBERS_URL);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const getMembersByKeyword = async (keywords) => {
  const formattedKeywords = keywords.replaceAll(' ', '%20');

  try {
    const res = await axios.get(`${MEMBERS_URL}?search=${keywords}`);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const getMemberById = async (memberId) => {
  try {
    const res = await axios.get(`${MEMBERS_URL}/${memberId}`);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const createMember = async (member) => {
  try {
    const res = await axios.post(MEMBERS_URL, member);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const editMember = async (memberId, editedMember) => {
  try {
    const res = await axios.put(`${MEMBERS_URL}/${memberId}`, editedMember);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const deleteMember = async (memberId) => {
  try {
    const res = await axios.delete(`${MEMBERS_URL}/${memberId}`);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export {
  getAllMembers,
  getMembersByKeyword,
  getMemberById,
  createMember,
  editMember,
  deleteMember,
};
