import React from 'react';
import image from './1000.jpg'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  photos: {
    display: 'flex',
    
  }
}))

const PostPage = () => {
  const classes = useStyles();
  const imageList = [{data_url:image}, {data_url:image}, {data_url:image}, {data_url:image}, {data_url:image}];
	return (
		<div>
			<h2> Title </h2>
			<div className={classes.photos}>
        {/* 이미지 최대 5장 */}
				{imageList.map((image, index) => (
					<img key={index}
							src={image.data_url}
							alt=""
						/>
				))}
      </div>
		</div>
	);
};

export default PostPage;
