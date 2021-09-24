/*
 * @Author: your name
 * @Date: 2021-08-27 14:38:07
 * @LastEditTime: 2021-09-23 20:50:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/plugins/element-ui.js
 */
import Vue from 'vue'
// import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

// Vue.use(Element, { locale })

import {
    Button,
    Select,
    Message,
    Dialog,
    Pagination,
    Input,
    Table,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Icon,
    Row,
    Col,
    Image,
    Carousel,
    CarouselItem,
    Breadcrumb,
    BreadcrumbItem,

  } from 'element-ui'
  
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Dialog)
  Vue.use(Pagination)
  Vue.use(Input)
  Vue.use(Table)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Icon)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Image)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)

  Vue.prototype.$message = Message
