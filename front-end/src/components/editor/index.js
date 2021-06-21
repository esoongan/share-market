import Select from 'react-select';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { categories } from 'constant/locale';
import Button from '@material-ui/core/Button';
import {
	Grid,
	InputAdornment,
	TextField,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
} from '@material-ui/core';
import ReactImageUploading from 'react-images-uploading';
import Alert from '@material-ui/lab/Alert';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import EmptyBackground from './empty.png';
import { imagePath } from 'constant/constant';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	error: {
		width: '100%',
		marginRight: 'auto',
		marginLeft: 'auto',
		marginBottom: theme.spacing(2),
	},

	title: {
		width: '100%',
		paddingBottom: theme.spacing(8),
	},

	content: {
		width: '100%',
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
	editGridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
		height: 160,
		alignItems: 'center',
	},
	empty: {
		height: 366,
		borderRadius: '4px',
		objectFit: 'contain',
	},
	uploadBtn: {
		width: '99%',
	},
}));

const Editor = ({
	title,
	content,
	price,
	deposit,
	onSubmit,
	onChangeInput,
	images,
	onSelectImages,
	editMode,
	error,
	old_images,
}) => {
	const classes = useStyles();
	const [deletedImages, setDeletedImages] = useState([]);
	const handleChangeInput = e => {
		const { value, name } = e.target;
		onChangeInput({ value, name });
	};
	const onSelect = ({ value }) => {
		onChangeInput({ value, name: 'category' });
	};
	const handleSubmit = e => {
		e.preventDefault();
		onSubmit(deletedImages);
	}
	return (
		<div className={classes.root}>
			{error !== null && (
				<Alert className={classes.error} severity="error">
					{error}
				</Alert>
			)}
			<Grid
				container
				direction="row"
				justify="center"
				spacing={2}
				alignItems="flex-start"
			>
				<Grid item xs={2}>
					<Select
						id="category"
						onChange={onSelect}
						placeholder="카테고리"
						onSelectResetsInput={false}
						isSearchable
						options={categories}
					/>
				</Grid>
				<Grid item xs={8}>
					<TextField
						className={classes.title}
						id="title"
						name="title"
						value={title}
						onChange={handleChangeInput}
						label="제목"
						variant="outlined"
					/>
				</Grid>
			</Grid>
			<Grid
				container
				direction="row"
				justify="center"
				spacing={2}
				alignItems="stretch"
				alignContent="flex-end"
			>
				<Grid item xs={4}>
					<div>
						<ReactImageUploading
							multiple
							value={images}
							onChange={onSelectImages}
							// onChange={imageList => setImages(imageList)}
							maxNumber={old_images ? 5-old_images.length+ deletedImages.length : 5}
							dataURLKey="data_url"
						>
							{({
								imageList,
								onImageUpload,
								onImageUpdate,
								onImageRemove,
								isDragging,
								dragProps,
								errors,
							}) => (
								<div
									className={classes.uploader}
									style={
										isDragging ? { backgroundColor: 'rgba(0,0,0,0.05)' } : null
									}
									{...dragProps}
								>
									{errors !== null && errors.maxNumber && (
										<Alert severity="error">
											최대 5장까지만 업로드 가능합니다.
										</Alert>
									)}
									{imageList.length === 0 ? (
										<img
											className={classes.empty}
											alt="empty"
											src={EmptyBackground}
										/>
									) : (
										<GridList
											className={
												imageList.length === 0
													? classes.empty
													: classes.gridList
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
									)}
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
						{/* edit mode - 기존의 사진 파일을 보여주고 삭제 가능하도록 */}
						{old_images && (
							<GridList
								className={classes.editGridList}
								cols={2.5}
								cellHeight={140}
							>
								{old_images.map((img, index) => (
									<GridListTile key={img.id}>
										<img
											src={imagePath + img.filename}
											alt={img.origFilename}
										/>
										<GridListTileBar
											title={img.origFilename}
											actionIcon={
												<IconButton
													aria-label={`remove ${img.origFilename}`}
													onClick={() => {
														if (deletedImages.includes(img.id)) {
															//기존 이미지 삭제 취소하기
															setDeletedImages(
																deletedImages.filter((value) => value !== img.id)
															);
														} else {
															//기존 이미지 삭제하기
															setDeletedImages([...deletedImages, img.id]);
														}
													}}
												>
													{deletedImages.includes(img.id) ? (
														<AddCircleOutlineIcon style={{ color: 'white' }} /> //기존 이미지 삭제 취소 시 플러스 아이콘
													) : (
														<HighlightOffOutlinedIcon
															style={{ color: 'red' }} /> //기존 이미지 삭제 시 마이너스 아이콘
													)}
												</IconButton>
											}
										/>
									</GridListTile>
								))}
							</GridList>
						)}
					</div>
				</Grid>

				<Grid item xs={6}>
					<TextField
						className={classes.content}
						id="content"
						name="content"
						value={content}
						onChange={handleChangeInput}
						label="상세 내용"
						multiline
						rows={20}
						variant="outlined"
					/>
				</Grid>
			</Grid>

			<Grid container direction="row" justify="flex-end" spacing={2}>
				<Grid item xs={3}>
					<TextField
						id="price"
						label="하루 당 렌탈비"
						name="price"
						value={isNaN(price) ? '' : price}
						onChange={handleChangeInput}
						className={classes.priceField}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">KRW/1일</InputAdornment>
							),
						}}
						error={isNaN(price) ? true : false}
					/>
				</Grid>
				<Grid item xs={3}>
					<TextField
						label="보증금"
						id="deposit"
						name="deposit"
						value={deposit}
						onChange={handleChangeInput}
						className={classes.priceField}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">KRW</InputAdornment>
							),
						}}
						error={isNaN(deposit) ? true : false}
					/>
				</Grid>
				<Grid item xs={1} />
			</Grid>
			<Button
				onClick={handleSubmit}
				className={classes.writeBtn}
				variant="outlined"
				color="primary"
			>
				{editMode ? '수정하기' : '작성하기'}
			</Button>
		</div>
	);
};

export default Editor;
