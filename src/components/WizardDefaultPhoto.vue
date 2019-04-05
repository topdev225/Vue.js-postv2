<template>
  <div class="wizard-default-photo">
    <div class="row photo-buttons">
      <div id="first">
            <h1 style="color:#000;font-size:13px;">Apple Podcast Image</h1>

      <div id="second"></div>
     </div>
     <div id = "mid">
     	<div class="vl"></div>
<div class = "or">OR</div>
<div class="vl"></div>
     </div>
<div id="first1">

<h1 style="color:#000;font-size:13px;">Image for social shares</h1>
<div id="uploadcenter">
<label class="btn-upload">
      <input type="file" name="fileupload" >
    <button class="btn">Browse</button>
</label>
      </div>
<div id="mid1">
<hr><div class="or">OR</div>
<hr>     </div>
      <div class="well">
    <a href="#" class="upload btn">
        <i class="icon-upload" style="padding-right: 5px"></i>
        <span>Select Licensed Image </span>
        <input type="file" class="opacity" /></a>
</div>
     </div>
  
      
     
    </div>
    
  </div>
</template>

<script>
  import Cropbox from '../components/Cropbox';

  import {
    setWizardStepValid,
    uploadFile,
  } from '../core/actions';

  const CURRENT_STEP = 2;

  export default {
    name: 'wizard-default-photo',

    components: {
      Cropbox,
    },

    data() {
      return {
        imageHeight: 200,
        rectWidth: 388,
        squareId: 'square_photo',
        rectangleId: 'rectangle_photo',
      };
    },

    vuex: {
      actions: {
        setWizardStepValid,
        uploadFile,
      },

      getters: {
        event: (state) => state.wizardEvent,
        currentStep: (state) => state.wizardSteps.steps[CURRENT_STEP],
      },
    },

    // This ready() is just for hacking to the Post Options
    // view since the photos aren't hooked up and you shouldn't
    // be able to go to Post Options until a default photo
    // has been selected. Remove once the photo functionality
    // has been implemented
    ready() {
      this.setWizardStepValid(CURRENT_STEP);
    },

    // TODO: Add appropriate validations in here
    // methods: {
    //   checkIfValid() {
    //     if (this.title.length > 3) {
    //       this.setWizardStepValid(this.currentStep);
    //     }
    //   },
    // },

    methods: {
      uploadDefaultImage(e) {
        const inFile = e.target.files[0];
        this.uploadFile('default_image', inFile);
        document.getElementById('photoUpload').value = null;
      },
      uploadSquareImage(e) {
        const inFile = e.target.files[0];
        this.uploadFile('square_image', inFile);
        document.getElementById('squareUpload').value = null;
      },
    },
  };
</script>
<style lang ="css">
.or {
  position: relative;
left: -10px;
color: #9b9b9b;
}
.btn{
  box-shadow :0 !important;
}
   .upload{
 padding: 19px 100px;
position: relative;
border-radius: 5px;
width: 437px;
height: 52px;
background: #c9db34;
color: #395244 !important;
text-align: center;
    }
    
    .upload input[type="file"]{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    }
    .opacity{
     -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
     -moz-opacity: 0;
     -khtml-opacity: 0;
     opacity: 0;
    }
    /*bootstrap*/    
.well {
min-height: 20px;
margin-bottom: 20px;
}

  .btn-upload {
  position: relative;
overflow: hidden;
display: inline-block;
width: 437px;
height: 37px;
cursor: pointer;
border: 1px solid #daddda;
} 

.btn-upload input[type=file] {
    position: absolute;
    opacity: 0;
    z-index: 0;
    max-width: 100%;
    height: 100%;
    width:500px;
    display: block;
}
.btn-upload .btn{
 padding: 9px 30px;
background: #c9db34;
border: 1px solid #2e6da4;
color: #395244;
border: 0;
float: right;
box-shadow :0px !important;
}
.btn-upload:hover .btn{
    padding: 9px 30px;
background: #c9db34;
border: 1px solid #2e6da4;
color: #395244;
border: 0;
float: right;
}
#first {
float: right;
width: 517px;
height: 572px;
background: #fbfbfb;
border: 1px solid #daddda;
padding:30px;
}
#first #second{
    width: 437px;
    height: 437px;
    background: #fff;
    position: relative;
    top:35px;
    left:10px;
  }
  #first1 {
    width: 517px;
    height: 572px;
  background: #fbfbfb;
border: 1px solid #daddda;
padding:30px;

}
#first1 #second1{
    width: 437px;
    height: 437px;
    background: pink;
    position: relative;
    top:95px;
    left:40px;
  }

  .vl {
  border-left:1px solid #979797;
  height: 20px;
}
div#mid {
    position: relative;
    float: right;
    top: 286px;
    left: 10px;
}
div#mid1{
  text-align:center;
}
.container
{
    display: table-cell;
    width: 200px;
    height: 200px;
    background-color: orange;
    vertical-align: middle;
}
     

.image
{
    display: block;
    height: 50px;
    width: 100px;
    margin-left: auto;
    margin-right: auto;
}
#box {
    /* some colors for reference */
    background-color: #fff;
    /* now let's set some dimensions! */
    width: 200px;
    height: 200px;
    padding: 20px;
    border: 2px solid #aaa;
    outline: #666 solid 50px;
    margin: 50px;
    /* the box is 260px wide according to the browser
       200 + 2(20) + 2(10) = 200 + 40 + 20 = 260px
       by adding up width, padding, and border
    
       visually it takes up 300 pixels,
       add 2(20) for the outline */        
}

</style>

<style lang="scss">
  .photo-buttons {
    margin-bottom: 2rem;
  }
  
  .width-auto-narrow {
    width: auto;
    min-width: 200px;
  }  
  
  .width-auto-wide {
    width: auto;
    min-width: 400px;
  }
</style>
