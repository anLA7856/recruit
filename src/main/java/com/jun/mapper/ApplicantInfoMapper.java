package com.jun.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.jun.model.ApplicantInfo;

@Mapper
public interface ApplicantInfoMapper {
	
	/**
	 * 用于新增一条记录
	 * @param applicantInfo
	 * @return
	 */
	public int addNewApplicantInfo(@Param("map") Map<String, Object> map);
	
	/**
	 * 更新信息
	 * @param id
	 * @param applicantInfo
	 */
	//public void updateApplicantInfoById(@Param("id")Integer id,@Param("applicantInfo") ApplicantInfo applicantInfo);
	
	
	/**
	 * 获取某个用户下所有申请列表进度
	 * @param username
	 * @return
	 */
	public List<ApplicantInfo> getAllApplicantInfoByUsername(@Param("username")String username);
	
	@Select("select * from applicant_info where id=#{0}")
	public ApplicantInfo getApplicantInfoById(Integer id);
}
