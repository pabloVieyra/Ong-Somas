import ReactHtmlParser from 'react-html-parser';

const ActivityContent = ({ content }) => {
  return <>{ReactHtmlParser(content)}</>;
};

export default ActivityContent;
