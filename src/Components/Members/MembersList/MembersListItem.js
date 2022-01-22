import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import style from '../../../Styles/MembersList/MembersList.module.css';
import {
  memberAvatarStyle,
  memberNameTypography,
} from '../../../Styles/MembersList/MembersListInlineStyles';
import {
  Box,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';

const MembersListItem = ({ member }) => {
  return (
    <>
      <ListItem alignItems="stretch">
        <ListItemAvatar sx={{ mr: '1rem' }}>
          <Avatar alt={member.name} src={member.image} sx={memberAvatarStyle} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography component="p" sx={memberNameTypography} variant="p">
              {member.name}
            </Typography>
          }
          secondary={
            <Box className={style.memberContainer}>
              <Typography component="p" variant="p">
                {member.description}
              </Typography>
              <Box>
                <Tooltip arrow sx={{ padding: 0 }} title={member.facebookUrl}>
                  <IconButton>
                    <a
                      href={member.facebookUrl}
                      rel="noopener noreferrer"
                      target="_blank">
                      <FacebookIcon className={style.socialMediaIcon} />
                    </a>
                  </IconButton>
                </Tooltip>
                <Tooltip arrow sx={{ padding: 0 }} title={member.linkedinUrl}>
                  <IconButton>
                    <a
                      href={member.linkedinUrl}
                      rel="noopener noreferrer"
                      target="_blank">
                      <LinkedInIcon className={style.socialMediaIcon} />
                    </a>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          }
        />
      </ListItem>
      <Divider component="div" />
    </>
  );
};

export default MembersListItem;
