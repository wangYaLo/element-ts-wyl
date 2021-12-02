<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Upload } from 'element-ui';
@Component({
  extends: Upload,
  name: 'wylUpload'
})
export default class wylUpload extends Vue {
  @Prop({ default: false }) beforDeleteTag!: () => Promise<any>;
  @Prop() data!: any;
  $confirm: any;
  deleteTag: any;
  $message: any;
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
