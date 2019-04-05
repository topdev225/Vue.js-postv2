<template>
  <div :id="crop_id" class="cropbox-image empty">
    <div :style="styleObject">
      <img :src="src"/>
    </div>
    <icon class="picture-icon" name="picture-o">
  </div>
</template>

<script>
  import Icon from '../../node_modules/vue-awesome/src/components/Icon';
  import {
    cropImage,
  } from '../core/actions';

  export default {
    name: 'cropbox',

    props: {
      src: String,
      crop_id: String,
      crop_height: Number,
      crop_width: Number,
    },

    events: {
      save_crop(id) {
        if (id === this.crop_id) {
          if (this.myCropbox) {
            const cropData = {};
            cropData.croppings = this.croppings;
            if (cropData.croppings.left > 3 ||
                cropData.croppings.right > 3 ||
                cropData.croppings.top > 3 ||
                cropData.croppings.bottom > 3) {
              cropData.id = this.crop_id;
              this.cropImage(cropData);
            }
          }
        }
      },
    },

    data() {
      return {
        myCropbox: null,
        jQuery: null,
        cropBoxRetries: 20,
      };
    },

    vuex: {
      actions: {
        cropImage,
      },
    },

    computed: {
      styleObject() {
        const heightStr = this.crop_height.toString();
        const widthStr = this.crop_width.toString();
        const styleObj = { height: `${heightStr}px`, width: `${widthStr}px` };
        return styleObj;
      },
      croppings() {
        const cropData = { left: 0, right: 0, bottom: 0, top: 0 };
        let results = {};
        if (this.jQuery(this.myCropbox).size() > 0) {
          results = this.jQuery(this.myCropbox).data('cropbox').result;
        }
        this.jQuery(this.wrapperId).find('.cropImage').each((i, el) => {
          const imagewidth = el.naturalWidth;
          const imageheight = el.naturalHeight;
          if (imagewidth > 0 && imageheight > 0) {
            cropData.left = (100.0 * results.cropX) / imagewidth;
            cropData.top = (100.0 * results.cropY) / imageheight;
            if (imagewidth - results.cropX > results.cropW) {
              cropData.right = (100.0 * (imagewidth -
                (results.cropX + results.cropW))) / imagewidth;
            }
            if (imageheight - results.cropY > results.cropH) {
              cropData.bottom = (100.0 * (imageheight -
                (results.cropY + results.cropH))) / imageheight;
            }
          }
        });
        return cropData;
      },
      wrapperId() {
        return `#${this.crop_id}`;
      },
    },

    attached() {
      this.jQuery = window.jQuery;
      this.jQuery(this.wrapperId).removeClass('populated').addClass('empty');
      if (this.src && this.src !== '') {
        this.waitForCropBox();
      }
    },

    methods: {
      waitForCropBox() {
        if (this.src && this.src !== '') {
          const image = this.jQuery(this.wrapperId).find('img');
          if (image.length && image[0].complete === true && image[0].naturalHeight > 0.0) {
            this.$nextTick(this.loadCropBox);
          } else {
            if (this.cropBoxRetries > 0) {
              this.cropBoxRetries--;
              window.setTimeout(this.waitForCropBox, 200);
            } else {
              if (this.jQuery(this.myCropbox).data('cropbox')) {
                this.jQuery(this.myCropbox).data('cropbox').remove();
              }
            }
          }
        } else {
          this.cropBoxRetries = 20;
        }
      },

      loadCropBox() {
        if (this.jQuery(this.myCropbox).data('cropbox')) {
          this.jQuery(this.myCropbox).data('cropbox').remove();
        }
        this.jQuery(this.wrapperId).removeClass('empty').addClass('populated');
        const cropboxData = { width: this.crop_width, height: this.crop_height,
                              maxZoom: 7.3, zoom: 15 };
        this.myCropbox = this.jQuery(this.wrapperId).find('img').cropbox(cropboxData);
      },
    },

    watch: {
      src() {
        this.jQuery = window.jQuery;
        this.jQuery(this.wrapperId).removeClass('populated').addClass('empty');
        if (this.src && this.src !== '') {
          this.waitForCropBox();
        }
      },
    },

    components: {
      Icon,
    },
  };
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .cropbox-image.empty { position: relative; background: $dark-grey; height: 200px; color: $light-grey; border: none; border-radius: 8px; padding: 8px; box-shadow: inset 4px 4px 8px opacify($black, 0.5);
    .picture-icon {
      display: block;
      color: $light-grey;
      opacity: .2;
      font-size: 100px;
      line-height: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      height: 100px;
      width: auto;
    }
    div { display: none;
      img { display: none; }
    }
  }
  
  .cropbox-image.populated { position: relative; background: $dark-grey; color: $light-grey; border: none; border-radius: 8px; padding: 8px; box-shadow: inset 4px 4px 8px opacify($black, 0.5);
    .picture-icon {
      display: none;
    } 
    div {
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    } 
  }
  
  .cropFrame {
	 overflow : hidden;
	 position : relative;
    display: inline-block;
  }

  .cropImage {
	 position : absolute;
	 top      : 0;
	 left     : 0;
	 cursor   : move;
	 max-width: none;
  }

  .cropControls {
	 background : #000;
	 width      : 100%;
	 height     : 26px;
	 position   : absolute;
	 z-index    : 100;
	 bottom     : 0;
	 left       : 0;
	 opacity    : 0;
	 filter     : alpha(opacity=0);
	 transition : opacity .25s linear;
	 -moz-transition    : opacity .25s linear;
	 -webkit-transition : opacity .25s linear;

     t-touch-callout: none;
     -webkit-user-select: none;
     -khtml-user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
     user-select: none;
  }

  .cropFrame.hover .cropControls {
    opacity    : .55;
    filter     : alpha(opacity=55);
  }

  .cropControls span {
    display   : block;
    float     : left;
    color     : #fff;
    font-size : 11px;
    margin    : 7px 0 0 5px;
  }

  .cropZoomIn,
  .cropZoomOut {
        display         : block;
        float           : right;
        margin          : 4px 4px 0 0;
        padding         : 0;
        background      : #fff;
        border: 1px solid #000;
        color           : #000;
        border-radius   : 4px;
        width           : 18px;
        height          : 18px;
        line-height     : 16px;
        font-size       : 18px;
        text-align      : center;
        text-decoration : none;
        cursor          : pointer;
  }

  .cropZoomIn::after,
  .cropZoomIn .after {
        content : "+";
        display : block;
        text-align:center;
  }

  .cropZoomOut::after,
  .cropZoomOut .after {
        content        : "-";
        display        : block;
        text-align:center;
  }

</style>
