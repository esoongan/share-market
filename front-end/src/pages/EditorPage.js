import Select from 'react-select';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { categories } from 'constant/locale';
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
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

	titleForm: {
		width: '100%',
	},

	uploader: {
		backgroundColor: 'red',
		// width: '100%',
		// paddingTop: '100%' /* 1:1 Aspect Ratio */,
		// position: 'relative' /* If you want text inside of it */,
	},
	preview: {
		display: 'flex',
		flexDirection: 'row',
	},
	previewItem: {
		marginRight: theme.spacing(2),
	},
}));
const EditorPage = () => {
	const classes = useStyles();
	const [images, setImages] = useState([]);

	return (
		<div className={classes.root}>
			<Grid
				container
				sm={16}
				lg={12}
				direction="row"
				justify="center"
				spacing={2}
				alignItems="center"
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
				<Grid item xs={6}>
					<TextField
						className={classes.titleForm}
						id="title"
						label="제목"
						variant="outlined"
					/>
				</Grid>
			</Grid>

			<div className={classes.contentsForm}>
				<Grid
					container
					sm={16}
					lg={12}
					dire
					ction="row"
					justify="center"
					spacing={2}
				>
					<Grid item>
						<ReactImageUploading
							className={classes.uploader}
							multiple
							value={images}
							onChange={imageList => setImages(imageList)}
							maxNumber={5}
							dataURLKey="data_url"
						>
							{({
								imageList,
								onImageUpload,
								onImageRemoveAll,
								onImageUpdate,
								onImageRemove,
								isDragging,
								dragProps,
								errors,
							}) => (
								// write your building UI
								<div>
									<IconButton
										color="primary"
										aria-label="upload picture"
										component="span"
									>
										<AddAPhotoRoundedIcon
											style={isDragging ? { color: 'red' } : null}
											onClick={onImageUpload}
											{...dragProps}
										></AddAPhotoRoundedIcon>
									</IconButton>
									&nbsp;
									<button onClick={onImageRemoveAll}>초기화</button>
									{errors !== null && errors.maxNumber && (
										<Alert severity="error">
											최대 5장까지만 업로드 가능합니다.
										</Alert>
									)}
									<div className={classes.preview}>
										<Grid
											container
											direction="row"
											justify="space-evenly"
											xs={10}
											md={8}
											lg={6}
										>
											{
												/* 미리보기 */
												imageList.map((image, index) => (
													<Grid item key={index}>
														<img
															src={image.data_url}
															alt=""
															width="150"
															onClick={() => onImageUpdate(index)}
														/>
                            <IconButton
                              color="primary"
                              aria-label="delete picture"
                              component="span"
                            >
                              <HighlightOffOutlinedIcon
                                onClick={() => onImageRemove(index)}
                              />
                            </IconButton>
													</Grid>
												))
											}
										</Grid>
									</div>
								</div>
							)}
						</ReactImageUploading>
					</Grid>

					<Grid item>
						<TextField
							id="content"
							label="상세 내용"
							multiline
							rows={10}
							defaultValue=""
							variant="outlined"
						/>
					</Grid>
				</Grid>
			</div>
			<div className={classes.priceForm}>
				<TextField
					label="하루 당 렌탈비"
					id="price"
					className={classes.priceField}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">KRW</InputAdornment>
						),
					}}
				/>
				<TextField
					label="보증금"
					id="deposit"
					className={classes.priceField}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">KRW</InputAdornment>
						),
					}}
				/>
			</div>
		</div>
	);
};

export default EditorPage;
