import Select from "react-select";
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { categories } from 'constant/locale'
import { FormControl, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@material-ui/core";
import ReactImageUploading from "react-images-uploading";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root:{
    display : 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(16),
  },
  
  titleForm: {
    display: 'flex',
    flexDirection: 'row',

  }
}));
const EditorPage = () => {
  const classes = useStyles();
  const [images, setImages] = useState([])

  return (
    <div className={classes.root}>
      <form className={classes.titleForm} noValidate>
        <Select id='category' placeholder='카테고리'
          onSelectResetsInput={false}
          isSearchable options={categories}
          onChange={() => { }}
        />
        <TextField id='title' label='제목' variant='outlined' />
      </form>
      <div className={classes.contentsForm}>
        <ReactImageUploading
          multiple
          value={images}
          onChange={(imageList) => setImages(imageList)}
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
            errors
          }) => (
            // write your building UI
            <div className={classes.uploader}>
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                사진 올리기 (최대 5장)
              </button>
            &nbsp;
              <button onClick={onImageRemoveAll}>초기화하기</button>
              {errors !== null && errors.maxNumber &&
                <Alert severity="error">최대 5장까지만 업로드 가능합니다.</Alert>
              }
              <div className={classes.preview}>
                {/* 미리보기 */
                  imageList.map((image, index) => (
                    <div key={index} className={classes.previewItem}>
                      <img src={image.data_url} alt="" width="100" />
                      <div className={classes.previewItemBtns}>
                        <button onClick={() => onImageUpdate(index)}>Update</button>
                        <button onClick={() => onImageRemove(index)}>Remove</button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </ReactImageUploading>
        <TextField
          id="content"
          label="상세 내용"
          multiline
          rows={10}
          defaultValue=""
          variant="outlined"
        />
      </div>
      <div className={classes.priceForm}>
        <TextField
          label="하루 당 렌탈비"
          id="price"
          className={classes.priceField}
          InputProps={{
            startAdornment: <InputAdornment position="start">KRW</InputAdornment>,
          }}
        />
        <TextField
          label="보증금"
          id="deposit"
          className={classes.priceField}
          InputProps={{
            startAdornment: <InputAdornment position="start">KRW</InputAdornment>,
          }}
        />

      </div>

    </div>
  )
}

export default EditorPage