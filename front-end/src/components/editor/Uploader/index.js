import React, { useState } from 'react';
import ReactImageUploading from 'react-images-uploading';
import Alert from '@material-ui/lab/Alert';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import {
	Button,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	gridList: {
		width: '100%',
		height: '100%',
		border: 'solid 1px grey',
		borderRadius: '4px',
	},
	uploader: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: 400,
	},
	empty: {
		width: '100%',
		height: '100%',
		border: 'solid 1px grey',
		background: 'grey',
		borderRadius: '4px',
	},
	uploadBtn: {
		width: '99%',
	},
}));

export default function Uploader() {
	const classes = useStyles();
  const [images, setImages] = useState([]);

	return (
		<div>
			<ReactImageUploading
				multiple
				value={images}
				onChange={imageList => setImages(imageList)}
				maxNumber={5}
				dataURLKey="data_url"
			>
				{({
					imageList,
					onImageUpload,
					onImageUpdate,
					onImageRemove,
					// isDragging,
					dragProps,
					errors,
				}) => (
					<div
						className={classes.uploader}
						// style={isDragging ? {backgroundColor: 'darkGrey' } : null}
						{...dragProps}
					>
						{errors !== null && errors.maxNumber && (
							<Alert severity="error">최대 5장까지만 업로드 가능합니다.</Alert>
						)}
						<GridList
							className={
								imageList.length === 0 ? classes.empty : classes.gridList
							}
							cellHeight={160}
							cols={2}
						>
							{imageList.map((image, index) => (
								<GridListTile key={index} cols={1}>
									<img
										src={image.data_url}
										alt=""
										onClick={() => onImageUpdate(index)}
									/>
									<GridListTileBar
										title={image.file.name}
										actionIcon={
											<IconButton
												aria-label={`delete`}
												className={classes.icon}
												onClick={() => onImageRemove(index)}
											>
												<HighlightOffOutlinedIcon style={{ color: 'white' }} />
											</IconButton>
										}
									/>
								</GridListTile>
							))}
						</GridList>
						<Button
							className={classes.uploadBtn}
							variant="contained"
							color="primary"
							onClick={onImageUpload}
						>
							<AddAPhotoRoundedIcon style={{ marginRight: 8 }} />
							업로드
						</Button>
					</div>
				)}
			</ReactImageUploading>
		</div>
	);
}
