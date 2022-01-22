import { useState, useEffect } from 'react';
import { Divider, List } from '@mui/material';
import MembersListItem from './MembersListItem';
import { membersListStyle } from '../../../Styles/MembersList/MembersListInlineStyles';
import { getAllMembers } from '../../../Services/membersService';

const mockupMembers = [
  {
    id: 258,
    name: 'Osvaldo Olivera',
    image: 'http://ongapi.alkemy.org/storage/kw2hNujhuq.jpeg',
    description: 'Presidente',
    facebookUrl: 'https://www.facebook.com/100075440371054/',
    linkedinUrl: 'https://www.linkedin.com/in/osvaldo-olivera-785b78226/',
  },
  {
    id: 259,
    name: 'Nahuel Narváez',
    image: 'http://ongapi.alkemy.org/storage/z5x07SOhzl.jpeg',
    description: 'Secretario',
    facebookUrl: 'https://www.facebook.com/100075448260572/',
    linkedinUrl: 'https://www.linkedin.com/in/nahuel-narváez-099b89226/',
  },
  {
    id: 261,
    name: 'Griselda Germán',
    image: 'http://ongapi.alkemy.org/storage/dR97wbZyUN.jpeg',
    description: 'Tesorera',
    facebookUrl: 'https://www.facebook.com/100074894726439/',
    linkedinUrl: 'https://www.linkedin.com/in/griselda-germán-137b83226/',
  },
];

const MembersList = () => {
  const [members, setMembers] = useState(mockupMembers);

  // useEffect(() => {
  //   getAllMembers().then((res) => setMembers(res));
  // }, []);

  return (
    <List sx={membersListStyle}>
      <Divider component="div" />
      {members.length &&
        members.map((member) => (
          <MembersListItem key={member.id} member={member} />
        ))}
    </List>
  );
};

export default MembersList;
