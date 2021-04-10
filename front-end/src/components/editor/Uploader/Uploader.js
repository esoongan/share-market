import React, { Component } from 'react';
import styles from './Uploader.scss';
import classNames from 'classnames/bind';
import ReactImageUploading from 'react-images-uploading';
import { UncontrolledAlert } from 'reactstrap';

const cx = classNames.bind(styles);

class Uploader extends Component {

  render() {
    const { images, onChange } = this.props
    return (
      <div>
        <ReactImageUploading
          multiple
          value={images}
          onChange={onChange}
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
            <div className={cx("uploader-wrapper")}>
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
                <UncontrolledAlert color="danger">
                  최대 5장까지만 가능합니다.
                </UncontrolledAlert>
              }
              <div className={cx('uploader-preview')}>
                {/* 미리보기 */
                  imageList.map((image, index) => (
                    <div key={index} className={cx("image-item")}>
                      <img src={image.data_url} alt="" width="100" />
                      <div className={cx("image-item_btn-wrapper")}>
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
      </div>
    );
  }
}
export default Uploader;