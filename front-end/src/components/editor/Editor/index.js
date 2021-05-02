import Select from 'react-select';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { categories } from 'constant/locale';
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core';
import Uploader from '../Uploader';

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
}));

const Editor = ({
	title,
	content,
	price,
	deposit,
	onSubmit,
	onChangeInput,
}) => {
	const classes = useStyles();
	const handleChangeInput = e => {
		const { value, name } = e.target;
		onChangeInput({ value, name });
	};
	const onSelect = ({ value }) => {
		onChangeInput({ value, name: 'category' });
	};


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
            name='title'
						value={title}
						onChange={handleChangeInput}
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
					<Uploader />
				</Grid>

				<Grid item xs={6}>
					<TextField
						className={classes.content}
						id="content"
            name='content'
						value={content}
						onChange={handleChangeInput}
						label="상세 내용"
						multiline
						rows={20}
						variant="outlined"
					/>
				</Grid>
			</Grid>

			<Grid container xs={12} direction="row" justify="flex-end" spacing={2}>
				<Grid item xs={3}>
					<TextField
						label="하루 당 렌탈비"
						id="price"
            name='price'
						value={price}
						onChange={handleChangeInput}
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
            name='deposit'
						value={deposit}
						onChange={handleChangeInput}
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
			<Button
				className={classes.writeBtn}
				variant="outlined"
				color="primary"
				onClick={onSubmit}
			>
				작성하기
			</Button>
		</div>
	);
};

export default Editor;
