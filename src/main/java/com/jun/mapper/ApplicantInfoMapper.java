package com.jun.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.jun.controller.dto.ApplicantInfoDto;
import com.jun.model.ApplicantInfo;

@Mapper
public interface ApplicantInfoMapper {

	/**
	 * 用于新增一条记录
	 * 
	 * @param applicantInfo
	 * @return
	 */
	public int addNewApplicantInfo(@Param("map") Map<String, Object> map);

	/**
	 * 更新信息
	 * 
	 * @param id
	 * @param applicantInfo
	 */
	public void updateApplicantInfo(@Param("map") Map<String, Object> map);

	/**
	 * 获取某个用户下所有申请列表进度
	 * 
	 * @param username
	 * @return
	 */
	public List<ApplicantInfoDto> getAllApplicantInfoByUsername(@Param("username") String username);

	@Select("select * from applicant_info where id=#{0}")
	public ApplicantInfo getApplicantInfoById(Integer id);

	/**
	 * 查看已经审批过得
	 * 
	 * @param username
	 * @return
	 */
	@Select("select count(*) from applicant_info where username=#{0} and target=1")
	public int getAreadyApplyCount(String username);

	/**
	 * 用来看，已经提交了申请，但是还没有审批过，即还在审核。
	 * 
	 * @param username
	 * @return
	 */
	@Select("select count(*) from applicant_info a,position_info b where a.positionId=b.id and b.target=1 and a.target=0 and a.username=#{0}")
	public int getAreadyApplyNotOk(String username);
	
	/**
	 * 查询，当前用户正在审核的，只能有一个。
	 * @param username
	 * @return
	 */
	@Select("select * from applicant_info a where a.username=#{0} and target=0")
	public ApplicantInfo getOnVerifyingByUsername(String username);
	
	/**
	 * 查询，通过审核的，只能有一个。
	 * @param username
	 * @return
	 */
	@Select("select * from applicant_info a where a.username=#{0} and target=1")
	public ApplicantInfo getAreadySuccessByUsername(String username);
}
