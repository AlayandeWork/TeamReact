import ImageList from '../../node_modules/@mui/material/ImageList';
import ImageListItem from '../../node_modules/@mui/material/ImageListItem';
import { useMediaQuery } from '@mui/material';

const ImageGallery = ({ itemData }) => {
  let count = 0;

  let cols = useMediaQuery('(min-width:600px)') ? 3 : 1;

  return (
    <ImageList
      sx={{ width: { sm: '100%', md: 800 } }}
      variant='masonry'
      cols={cols}
      gap={8}
    >
      {itemData.map((item) => (
        <ImageListItem key={count++}>
          <img
            srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item}?w=248&fit=crop&auto=format`}
            alt={item}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGallery;
