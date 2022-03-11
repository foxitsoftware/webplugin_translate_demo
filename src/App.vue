<template>
  <div id="app">

    <Row type="flex" justify="center">
      <Col>
        <Form ref="formInline" inline>

          <Tag size="large" style="width:80px;padding-left:26px;font-size: 15px; margin-top: -3px;">Auto</Tag>

          <Icon :size=30 style="margin-left: 10px;margin-right: 10px;margin-top:1px" type="md-swap"/>

          <FormItem>
            <Select v-model="formItem.selectlanguage" style="width: 80px" @on-change="chooseLanguage()">
              <Option value="en">English</Option>
              <Option value="zh">中文</Option>
              <Option value="fra">法语</Option>
              <Option value="de">德语</Option>
              <Option value="jp">日语</Option>

            </Select>
          </FormItem>

        </Form>
      </Col>
    </Row>


    <Row type="flex" justify="center">
      <Col :span="23">
        <Alert show-icon>Form</Alert>
      </Col>

      <Col :span="23">
        <Input  v-model="formItem.selecttext" type="textarea" :autosize="{minRows: 2,maxRows: 100}" placeholder=""></Input>
      </Col>

    </Row>


    <Row type="flex" justify="center" style="margin-top:10px">
      <Col :span="23">
        <Alert show-icon>To</Alert>
      </Col>
      <Col :span="23">
        <Input :class="inputColor"  v-model="formItem.translateto" type="textarea" :autosize="{minRows: 2,maxRows: 100}" placeholder=""></Input>
<!--        <span v-bind:style="{ color: activeColor}"  >{{formItem.translateto}}</span>-->
      </Col>
    </Row>

    <Row type="flex" justify="center" style="margin-top:5px;">
      <Col :span="23">
        <Form>
          <FormItem>
            <Button style="width: 100%" type="primary" :loading=loading @click="gotranslate">try again</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import translate from 'fanyi.baidu.com'
// import MysKeyTranslate from './MysKeyTranslate.js';
import md5 from 'js-md5';


export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      loading: false,
      formItem: {
        selectlanguage: 'zh',
        desc:'xawawsa',
        selecttext: '',
        translateto: ''
      },
      activeColor: '',
      inputColor:"",
      fontSize: 30
    }
  }, mounted() {
    const oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    // IE
    if (oScript.readyState) {
      oScript.onreadystatechange = () => {
        if (oScript.readyState == "loaded" || oScript.readyState == "complete") {
          oScript.onreadystatechange = null;
          // callback();
          // alert("onload11")
        }
      };
    } else { // others
      oScript.onload = () => {

        window.Foxit.ready().then(() => {
          window.Foxit.ReaderApp.addAppListener('selectText', (text) => {
            this.formItem.selecttext = text
            console.log(this.formItem.selecttext)
            this.gotranslate();
          });
        }).catch(err => {
          alert(err)
        })

      };
    }

    oScript.src = 'https://webpluginapi-azk8s.foxitcloud.com/foxit.umd.min.js';
    document.body.appendChild(oScript);


  }, methods: {
    chooseLanguage(){
      this.gotranslate()
    },
    async gotranslate() {
      // alert("ss")
      // alert()
      // await window.Foxit.ReaderApp.alert('Hello plugin.');
      // window.Foxit.ReaderApp.addAppListener('selectText', (text) => {
      //   // vm.UpdateSelectText(text);
      //   // document.getElementById('selectText').innerText = text;
      //   // goTranslate();
      //   alert("SSaa");
      // });
      //
      // await window.Foxit.ReaderApp.alert('Hello plugin.1');
      // console.log("====")
      // console.log(this.formItem.selectlanguage)
      // console.log("====")
      this.inputColor = ''
      this.loading = true
      var q = this.formItem.selecttext;
      var appid = '20220127001068871';  //你的appid 需要注册申请
      var key = 'vxkTvqE0EptOmHjFa5qz'; //开发者秘钥
      var salt = 11;//(new Date).getTime();  //时间戳或者随机数
      var from = 'auto';                  //翻译源语言
      var to = this.formItem.selectlanguage;                    //翻译的目标语言
      var str1 = appid + q + salt + key; //appid+q+salt+密钥的MD5值
      var sign = md5(str1);             //签名
      let data = {
        q,
        appid,
        salt,
        from,
        to,
        sign
      }
      this.$jsonp("https://fanyi-api.baidu.com/api/trans/vip/translate", data).then((data) => {
        //返回的数据字符串格式
        console.log(data)
        this.loading = false

        if (data.error_msg == undefined && data.trans_result.length > 0) {
          let transcontent = ''
          for (let i = 0; i < data.trans_result.length; i++) {
            transcontent += data.trans_result[i].dst
          }
          // document.getElementById('translateText').innerText = transcontent
          this.formItem.translateto = transcontent
        } else {
          // document.getElementById('translateText').innerText = 'translate failed'
          this.formItem.translateto = data.error_msg
          this.inputColor = 'input-call_fail'
        }

        // eslint-disable-next-line no-unused-vars
      }).cache(err => {
        this.loading = false
      })

    }
  }
}
</script>

<style>
.input-call_fail :nth-last-child(1){
  color: red !important;
}


.demo-spin-container{
  display: inline-block;
  width: 200px;
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  !*margin-top: 60px;*!*/
/*}*/
</style>
