package com.jun.service;

import com.jun.controller.dto.IndexDto;
import com.jun.controller.dto.NewsDto;

/**
 * 用于 在index 里面获取数据。
 * @author jun
 * @date 2018年4月11日 : 下午11:49:16
 *
 */
public class IndexService {
	
	public IndexDto getNewsDtoPart(){
		IndexDto dto = new IndexDto();
		dto.setPart0(part0);
		return new IndexDto();
	}
	
	
}
