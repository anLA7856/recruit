package com.jun.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.jun.controller.dto.ApplicantInfoDto;
import com.jun.controller.dto.ApplicantInfoDto2;
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

	/**
	 * 应该加一个email控制权限的。
	 * @param id
	 * @return
	 */
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
	
	
	/**
	 * 用于，职位发布者，去获取所有申请该职位人员。
	 * @param id
	 * @return
	 */
	@Select("select id,name,target from applicant_info a where a.positionId=#{0} limit #{1},#{2}")
	public List<ApplicantInfoDto2> getLimitApplicantInfoById(Integer id,Integer start,Integer length);
	
	
	@Select("select count(*) from applicant_info a where a.positionId=#{0}")
	public int getCountApplicantInfoById(Integer id);
	
	/**
	 * 用于更新applicant_info的状态。
	 * @param target
	 * @param id
	 */
	@Select("update applicant_info set target=#{0} where id=#{1}")
	public void updateApplicantInfoTargetById(Integer target,Integer id);
	
	/**
	 * 用于publisher检索，某条数据。
	 * @param id
	 * @param username
	 * @return
	 */
	@Select("select * from applicant_info a, user u,position_info p where a.id=#{0} and p.username=u.username and a.positionId=p.id and p.username=#{1}")
	public ApplicantInfo getApplicantInfoByIdAndUsername(Integer id,String username);
}
