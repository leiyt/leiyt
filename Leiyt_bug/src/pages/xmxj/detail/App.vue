<template>
	<div id="app">
		<div class="model_xmxj_box">
			<div class="box_full page_xmxj_detail">
				<!-- 主内容边距 -->
				<div class="padding-box">
					<!-- 缘主信息 -->
					<div class="info_box">
						<div class="basic_info">
							<div>
								<span class="name_box">缘主：
									<i>王</i>
									<i>宝</i>
									<i>强</i>
								</span>
								<span class="sex_box">性别：
									<i>男</i>
								</span>
							</div>
							<div>
								公历生日：
								<span>1990年1月30日</span>
								<span>时辰未知</span>
							</div>
							<div>
								农历生日：
								<span>1990年1月30日</span>
								<span>时辰未知</span>
							</div>
						</div>
					</div>
					<!-- 详情内容 -->
					<div class="unlock_content">
						<div class="top_img">
							<img src="../_img/xmxj_unlock_top_title.png" alt="">
						</div>
						<i class="top_style_img"></i>
						<div class="content_box">
							<!-- 你的八字命盘 -->
							<div class="content_title"><img src="../_img/xmxj_detail_bazi_title.png" alt=""></div>
							<div class="table_box">
								<table border="0" cellspacing="0">
									<tr>
										<th class="title-color"></th>
										<th class="title-color">年柱</th>
										<th class="title-color">月柱</th>
										<th class="title-color">日柱</th>
										<th class="title-color">时柱</th>
									</tr>
									<tr>
										<td class="title-color">十神</td>
										<td>偏财</td>
										<td>正官</td>
										<td>日元</td>
										<td>正官</td>
									</tr>
									<tr>
										<td class="title-color">天干</td>
										<td>甲</td>
										<td>丁</td>
										<td>庚</td>
										<td>丁</td>
									</tr>
									<tr>
										<td class="title-color">地支</td>
										<td>甲</td>
										<td>丁</td>
										<td>庚</td>
										<td>丁</td>
									</tr>
									<tr>
										<td class="title-color" rowspan="3">藏干</td>
										<td>[0]</td>
										<td>[0]</td>
										<td>[0]</td>
										<td>[0]</td>
									</tr>
									<tr>
										<td>[1]</td>
										<td>[1]</td>
										<td>[1]</td>
										<td>[1]</td>
									</tr>
									<tr>
										<td>[2]</td>
										<td>[2]</td>
										<td>[2]</td>
										<td>[2]</td>
									</tr>
									<tr>
										<td class="title-color" rowspan="3">支神</td>
										<td>[0]</td>
										<td>[0]</td>
										<td>[0]</td>
										<td>[0]</td>
									</tr>
									<tr>
										<td>[1]</td>
										<td>[1]</td>
										<td>[1]</td>
										<td>[1]</td>
									</tr>
									<tr>
										<td>[2]</td>
										<td>[2]</td>
										<td>[2]</td>
										<td>[2]</td>
									</tr>
									<tr>
										<td class="title-color">纳音</td>
										<td>甲</td>
										<td>丁</td>
										<td>庚</td>
										<td>丁</td>
									</tr>
									<tr>
										<td class="title-color">长生</td>
										<td>病</td>
										<td>沐浴</td>
										<td>养</td>
										<td>病</td>
									</tr>
									<tr>
										<td class="title-color">空亡</td>
										<td>kongwang</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td class="title-color">神煞</td>
										<td colspan="4">戊戌 沐浴 贵人 将星 桃花</td>
									</tr>
								</table>
							</div>
							<div class="fate_box">
								<div>
									<span class="color_dark">胎元：</span>戊辰
									<span class="color_dark margin_l">命官：</span>己巳
									<span class="color_dark margin_l">喜用神：</span>土土土
								</div>
								<div>
									<span class="color_dark">起运：</span>命主于出生后6年1月23日10时开始起运
								</div>
								<div>
									<span class="color_dark">交运：</span>命主于2020年10月10日10时开始交运
								</div>
							</div>
							
							<div class="content_title"><img src="../_img/xmxj_detail_name_title.png" alt=""></div>
							<!-- 五格数理分析 -->
							<div class="item_title"><img src="../_img/xmxj_detail_item_title1.png" alt="">
								<span class="icon_arrow" :class="{show:showIndex ==0 && showFlag}" @click="toggleShow(0)"></span>
							</div>
							<ul class="item" v-show="showIndex == 0">
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index1.png" alt="1"></span>
										<span>天格：8（阴金）</span>
									</div>
									<div class="t_title2 color_dark">【天格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">天格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index2.png" alt="2"></span>
										<span>人格：12（阴木）</span>
									</div>
									<div class="t_title2 color_dark">【人格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">人格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index3.png" alt="3"></span>
										<span>地格：15（阳土）</span>
									</div>
									<div class="t_title2 color_dark color_dark">【地格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">地格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index4.png" alt="4"></span>
										<span>总格：49（阳水）</span>
									</div>
									<div class="t_title2 color_dark">【总格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">总格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index5.png" alt="5"></span>
										<span>外格：11（阳木）</span>
									</div>
									<div class="t_title2 color_dark">【外格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">外格对命运的影响：</soan>
									</p>
								</li>
							</ul>
							<!-- 姓名看性格 -->
							<div class="item_title"><img src="../_img/xmxj_detail_item_title2.png" alt="">
								<span class="icon_arrow" :class="{show:showIndex ==1 && showFlag}" @click="toggleShow(1)"></span>
							</div>
							<ul class="item" v-show="showIndex == 1">
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index1.png" alt="1"></span>
										<span>天格：8（阴金）</span>
									</div>
									<div class="t_title2 color_dark">【天格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">天格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index2.png" alt="2"></span>
										<span>人格：12（阴木）</span>
									</div>
									<div class="t_title2 color_dark">【人格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">人格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index3.png" alt="3"></span>
										<span>地格：15（阳土）</span>
									</div>
									<div class="t_title2 color_dark color_dark">【地格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">地格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index4.png" alt="4"></span>
										<span>总格：49（阳水）</span>
									</div>
									<div class="t_title2 color_dark">【总格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">总格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index5.png" alt="5"></span>
										<span>外格：11（阳木）</span>
									</div>
									<div class="t_title2 color_dark">【外格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">外格对命运的影响：</soan>
									</p>
								</li>
							</ul>
							<!-- 姓名看社交能力 -->
							<div class="item_title"><img src="../_img/xmxj_detail_item_title3.png" alt="">
								<span class="icon_arrow" :class="{show:showIndex ==2 && showFlag}" @click="toggleShow(2)"></span>
							</div>
							<ul class="item" v-show="showIndex == 2">
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index1.png" alt="1"></span>
										<span>天格：8（阴金）</span>
									</div>
									<div class="t_title2 color_dark">【天格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">天格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index2.png" alt="2"></span>
										<span>人格：12（阴木）</span>
									</div>
									<div class="t_title2 color_dark">【人格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">人格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index3.png" alt="3"></span>
										<span>地格：15（阳土）</span>
									</div>
									<div class="t_title2 color_dark color_dark">【地格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">地格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index4.png" alt="4"></span>
										<span>总格：49（阳水）</span>
									</div>
									<div class="t_title2 color_dark">【总格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">总格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index5.png" alt="5"></span>
										<span>外格：11（阳木）</span>
									</div>
									<div class="t_title2 color_dark">【外格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">外格对命运的影响：</soan>
									</p>
								</li>
							</ul>
							<!-- 姓名看健康 -->
							<div class="item_title"><img src="../_img/xmxj_detail_item_title4.png" alt="">
								<span class="icon_arrow" :class="{show:showIndex ==3 && showFlag}" @click="toggleShow(3)"></span>
							</div>
							<ul class="item" v-show="showIndex == 3">
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index1.png" alt="1"></span>
										<span>天格：8（阴金）</span>
									</div>
									<div class="t_title2 color_dark">【天格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">天格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index2.png" alt="2"></span>
										<span>人格：12（阴木）</span>
									</div>
									<div class="t_title2 color_dark">【人格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">人格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index3.png" alt="3"></span>
										<span>地格：15（阳土）</span>
									</div>
									<div class="t_title2 color_dark color_dark">【地格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">地格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index4.png" alt="4"></span>
										<span>总格：49（阳水）</span>
									</div>
									<div class="t_title2 color_dark">【总格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">总格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index5.png" alt="5"></span>
										<span>外格：11（阳木）</span>
									</div>
									<div class="t_title2 color_dark">【外格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">外格对命运的影响：</soan>
									</p>
								</li>
							</ul>
							<!-- 姓名看事业财运 -->
							<div class="item_title"><img src="../_img/xmxj_detail_item_title5.png" alt="">
								<span class="icon_arrow" :class="{show:showIndex ==4 && showFlag}" @click="toggleShow(4)"></span>
							</div>
							<ul class="item" v-show="showIndex == 4">
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index1.png" alt="1"></span>
										<span>天格：8（阴金）</span>
									</div>
									<div class="t_title2 color_dark">【天格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">天格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index2.png" alt="2"></span>
										<span>人格：12（阴木）</span>
									</div>
									<div class="t_title2 color_dark">【人格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">人格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index3.png" alt="3"></span>
										<span>地格：15（阳土）</span>
									</div>
									<div class="t_title2 color_dark color_dark">【地格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">地格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index4.png" alt="4"></span>
										<span>总格：49（阳水）</span>
									</div>
									<div class="t_title2 color_dark">【总格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">总格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index5.png" alt="5"></span>
										<span>外格：11（阳木）</span>
									</div>
									<div class="t_title2 color_dark">【外格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">外格对命运的影响：</soan>
									</p>
								</li>
							</ul>
							<!-- 姓名看婚恋家庭 -->
							<div class="item_title"><img src="../_img/xmxj_detail_item_title6.png" alt="">
								<span class="icon_arrow" :class="{show:showIndex ==5 && showFlag}" @click="toggleShow(5)"></span>
							</div>
							<ul class="item" v-show="showIndex == 5">
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index1.png" alt="1"></span>
										<span>天格：8（阴金）</span>
									</div>
									<div class="t_title2 color_dark">【天格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">天格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index2.png" alt="2"></span>
										<span>人格：12（阴木）</span>
									</div>
									<div class="t_title2 color_dark">【人格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">人格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index3.png" alt="3"></span>
										<span>地格：15（阳土）</span>
									</div>
									<div class="t_title2 color_dark color_dark">【地格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">地格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index4.png" alt="4"></span>
										<span>总格：49（阳水）</span>
									</div>
									<div class="t_title2 color_dark">【总格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">总格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index5.png" alt="5"></span>
										<span>外格：11（阳木）</span>
									</div>
									<div class="t_title2 color_dark">【外格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">外格对命运的影响：</soan>
									</p>
								</li>
							</ul>
							<!-- 姓名与八字的匹配度 -->
							<div class="item_title"><img src="../_img/xmxj_detail_item_title7.png" alt="">
								<span class="icon_arrow" :class="{show:showIndex ==6 && showFlag}" @click="toggleShow(6)"></span>
							</div>
							<ul class="item" v-show="showIndex == 6">
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index1.png" alt="1"></span>
										<span>天格：8（阴金）</span>
									</div>
									<div class="t_title2 color_dark">【天格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">天格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index2.png" alt="2"></span>
										<span>人格：12（阴木）</span>
									</div>
									<div class="t_title2 color_dark">【人格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">人格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index3.png" alt="3"></span>
										<span>地格：15（阳土）</span>
									</div>
									<div class="t_title2 color_dark color_dark">【地格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">地格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index4.png" alt="4"></span>
										<span>总格：49（阳水）</span>
									</div>
									<div class="t_title2 color_dark">【总格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">总格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index5.png" alt="5"></span>
										<span>外格：11（阳木）</span>
									</div>
									<div class="t_title2 color_dark">【外格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">外格对命运的影响：</soan>
									</p>
								</li>
							</ul>
							<!-- 命局五行改良建议 -->
							<div class="item_title"><img src="../_img/xmxj_detail_item_title8.png" alt="">
								<span class="icon_arrow" :class="{show:showIndex ==7 && showFlag}" @click="toggleShow(7)"></span>
							</div>
							<ul class="item" v-show="showIndex == 7">
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index1.png" alt="1"></span>
										<span>天格：8（阴金）</span>
									</div>
									<div class="t_title2 color_dark">【天格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">天格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index2.png" alt="2"></span>
										<span>人格：12（阴木）</span>
									</div>
									<div class="t_title2 color_dark">【人格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">人格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index3.png" alt="3"></span>
										<span>地格：15（阳土）</span>
									</div>
									<div class="t_title2 color_dark color_dark">【地格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">地格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index4.png" alt="4"></span>
										<span>总格：49（阳水）</span>
									</div>
									<div class="t_title2 color_dark">【总格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">总格对命运的影响：</soan>
									</p>
								</li>
								<li class="tips_item">
									<div class="t_title color_dark">
										<span class="icon_index"><img src="../_img/xmxj_detail_index5.png" alt="5"></span>
										<span>外格：11（阳木）</span>
									</div>
									<div class="t_title2 color_dark">【外格含义】</div>
									<p>
										<soan class="color_dark">数理：</soan>
									</p>
									<p>
										<soan class="color_dark">含义：</soan>
									</p>
									<p>
										<soan class="color_dark">外格对命运的影响：</soan>
									</p>
								</li>
							</ul>
						</div>
						<i class="bottom_style_img"></i>
					</div>
				</div>
			</div>
			<!-- footer -->
			<Footer></Footer>
			<!-- 公共错误处理 t -->
			<PluErrHandle></PluErrHandle>
		</div>
	</div>
</template>
<script>
import Footer from "../components/footer.vue";
export default {
  //   name: "app",
  components: {
    Footer
  },
  data() {
    return {
		showIndex: 0,
		showFlag: true
	};
  },
  mounted() {},
  methods: {
	  toggleShow(index){
		  this.showIndex = index;
		  this.showFlag = !this.showFlag;
	  }
  }
};
</script>
<style lang='scss'>
@import "@/style/_base.scss";
@import "../_style/_base.scss";
@import "./index.scss";
</style>