package com.jun.service;

import com.jun.controller.dto.IndexDto;
import com.jun.controller.dto.NewsDto;
import com.jun.controller.dto.NewsDtoPart;
import com.jun.mapper.NewsMapper;
import com.jun.mapper.NewsTypeMapper;
import com.jun.utils.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 用于 在index 里面获取数据。
 * @author jun
 * @date 2018年4月11日 : 下午11:49:16
 *
 */
@Service
public class IndexService {

	@Autowired
	NewsTypeMapper newsTypeMapper;

	@Autowired
	NewsMapper newsMapper;

	public IndexDto getNewsDtoPart(){
		IndexDto dto = new IndexDto();
		dto.setPart0(getCommonNews());
		dto.setPart1(getNews(Model.COLLUMN_SHOUYE));
		dto.setPart2(getNews(Model.COLLUMN_ZHAOKAOZHIWEI));
		dto.setPart3(getNews(Model.COLLUMN_ZHENGCEFAGUI));
		dto.setPart4(getNews(Model.COLLUMN_CHANGJIANWENTI));
		dto.setPart5(getNews(Model.COLLUMN_ZHAOKAOZHIWEI));
		dto.setPart6(getNews(Model.COLLUMN_XIANGGUANXIAZAI));
		dto.setPart7(getNews(Model.COLLUMN_GONGGAOGONGSHI));
		return dto;
	}

	/**
	 * 所有新闻的前五条
	 * @return
	 */
	private NewsDtoPart getCommonNews() {
		NewsDtoPart ndp = new NewsDtoPart();
		//设置种类id
		ndp.setId(-1);
		//设置名称
		ndp.setName("全部动态");
		//设置新闻，5条
		ndp.setList(newsMapper.getFiveCommonNews());
		return ndp;
	}

	private NewsDtoPart getNews (int type){
		NewsDtoPart ndp = new NewsDtoPart();
		//设置种类id
		ndp.setId(type);
		//设置名称
		ndp.setName(newsTypeMapper.getNewsTypeById(type).getNewsType());
		//设置新闻，5条
		ndp.setList(newsMapper.getFiveNewsByTypeId(type));
		return ndp;
	}
	
	
}
