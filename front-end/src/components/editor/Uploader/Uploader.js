import React, { Component } from 'react';
import styles from './Uploader.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);




class Uploader extends Component {
  handleSelectPhoto = (e) => {
    const { onInput } = this.props
    const fileList = e.target.files
    onInput(fileList)
  }
  render() {
    const { handleSelectPhoto } = this
    const { previewUrl } = this.props

    let preview = <div className={cx('preview-img', 'nothing')}>제품의 사진을 추가해주세요 (최대 5장)</div>
    if (previewUrl.length > 0) {
      preview = previewUrl.map(
        (url) => (<img className={cx('preview-img')}
          src={url} alt='preview'
        />)
      )
    }
    return (
      <div>
        <div className={cx('preview-container')}>
          {preview}
        </div>
        <input type="file" multiple accept="image/*"
          onInput={handleSelectPhoto} />
      </div>
    );
  }
}
export default Uploader;