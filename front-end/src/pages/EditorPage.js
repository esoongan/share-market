import Select from 'react-select';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { categories } from 'constant/locale';
import {
	Button,
	Grid,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
	InputAdornment,
	TextField,
} from '@material-ui/core';
import ReactImageUploading from 'react-images-uploading';
import Alert from '@material-ui/lab/Alert';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},

	title: {
		width: '100%',
		paddingBottom: theme.spacing(8),
	},
	uploader: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: 400,
	},
	content: {
		width: '100%',
	},
	gridList: {
		width: '100%',
		height: '100%',
		border: 'solid 1px grey',
		borderRadius: '4px',
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
	priceField: {
		width: '100%',
	},
	writeBtn: {
		width: 'fit-content',
		marginTop: theme.spacing(4),
		marginLeft: 'auto',
		marginRight: theme.spacing(14),
	},
}));
const EditorPage = () => {
	const classes = useStyles();
	const [images, setImages] = useState([]);

	return (
		<div className={classes.root}>
			<Grid
				container
				xs={12}
				direction="row"
				justify="center"
				spacing={2}
				alignItems="flex-start"
			>
				<Grid item xs={2}>
					<Select
						id="category"
						placeholder="카테고리"
						onSelectResetsInput={false}
						isSearchable
						options={categories}
						onChange={() => {}}
					/>
				</Grid>
				<Grid item xs={8}>
					<TextField
						className={classes.title}
						id="title"
						label="제목"
						variant="outlined"
					/>
				</Grid>
			</Grid>
			<Grid
				container
				xs={12}
				direction="row"
				justify="center"
				spacing={2}
				alignItems="stretch"
				alignContent="flex-end"
			>
				<Grid item xs={4}>
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
									<Alert severity="error">
										최대 5장까지만 업로드 가능합니다.
									</Alert>
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
														<HighlightOffOutlinedIcon
															style={{ color: 'white' }}
														/>
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
				</Grid>

				<Grid item xs={6}>
					<TextField
						className={classes.content}
						id="content"
						label="상세 내용"
						multiline
						rows={20}
						defaultValue=""
						variant="outlined"
					/>
				</Grid>
			</Grid>

			<Grid container xs={12} direction="row" justify="flex-end" spacing={2}>
				<Grid item xs={3}>
					<TextField
						label="하루 당 렌탈비"
						id="price"
						className={classes.priceField}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">KRW/1일</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={3}>
					<TextField
						label="보증금"
						id="deposit"
						className={classes.priceField}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">KRW</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={1} />
			</Grid>
			<Button className={classes.writeBtn} variant="outlined" color="primary">
				작성하기
			</Button>
		</div>
	);
};

export default EditorPage;
