import ReactMarkdown from 'react-markdown';
import {
  Typography, List, ListItem
} from '@material-ui/core';

const MarkdownComponent = ({ children: content }) => (
  <ReactMarkdown
    components={{
      h1: ({ children }) => (
        <Typography variant="h1">
          {children}
        </Typography>
      ),
      h2: ({ children }) => (
        <Typography variant="h2">
          {children}
        </Typography>
      ),
      h3: ({ children }) => (
        <Typography variant="h3">
          {children}
        </Typography>
      ),
      h4: ({ children }) => (
        <Typography variant="h4">
          {children}
        </Typography>
      ),
      h5: ({ children }) => (
        <Typography variant="h5">
          {children}
        </Typography>
      ),
      h6: ({ children }) => (
        <Typography variant="h6">
          {children}
        </Typography>
      ),
      p: Typography,
      ul: ({ children }) => (
        <List ordered="false">
          {children}
        </List>
      ),
      li: ({ children, ordered }) => (
        <ListItem ordered={ordered ? 'true' : 'false'}>
          {children}
        </ListItem>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownComponent;
