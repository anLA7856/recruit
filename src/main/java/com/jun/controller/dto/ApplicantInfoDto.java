package com.jun.controller.dto;

/**
 * 用于映射applicant_info表的部分数据。
 * 
 * @author jun
 * @date 2018年4月6日 : 下午8:22:34
 *
 */
public class ApplicantInfoDto {
	private Integer id;
	private Integer positionId;
	private String positionName;
	private Integer target;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPositionId() {
		return positionId;
	}

	public void setPositionId(Integer positionId) {
		this.positionId = positionId;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public Integer getTarget() {
		return target;
	}

	public void setTarget(Integer target) {
		this.target = target;
	}

	@Override
	public String toString() {
		return "ApplicantInfoDto [id=" + id + ", positionId=" + positionId + ", positionName=" + positionName
				+ ", target=" + target + "]";
	}

}
