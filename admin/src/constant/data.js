import React from 'react'

import data    from 'icon/icon_data.svg';
import data_c  from 'icon/icon_data_c.svg';
import mooc    from 'icon/icon_mooc.svg';
import mooc_c  from 'icon/icon_mooc_c.svg';
import shop    from 'icon/icon_shop.svg';
import shop_c  from 'icon/icon_shop_c.svg';
import cont    from 'icon/icon_cont.svg';
import cont_c  from 'icon/icon_cont_c.svg';
import clen    from 'icon/icon_clean.svg';
import clen_c  from 'icon/icon_clean_c.svg';
import good    from 'icon/icon_goods.svg';
import good_c  from 'icon/icon_goods_c.svg';

export const DATE_FORMAT  = 'YYYY/MM/DD'
export const MONTH_FORMAT = 'YYYY/MM'


export var MENU_MAIN = 
   [
    { title:'轮播图片', icon: shop, iconc: shop_c, path: '/',   },
    { title:'新闻管理', icon: mooc, iconc: mooc_c, path: '/news'},
    { title:'工程项目', icon: data, iconc: data_c, path: '/proj'},
    { title:'设计人员', icon: clen, iconc: clen_c, path: '/desi'},
    { title:'访客留言', icon: good, iconc: good_c, path: '/msg'},
    { title:'系统设置', icon: cont, iconc: cont_c, path: '/conf'}
   ]



