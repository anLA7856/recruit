package com.jun.controller.dto;

/**
 * 用于 在首页 传输新闻数据 7个
 * 
 * @author jun
 * @date 2018年4月11日 : 下午11:37:07
 *
 */

public class IndexDto {

	/**
	 * 用于全部动态
	 */
	private NewsDtoPart part0;

	private NewsDtoPart part7;
	private NewsDtoPart part1;
	private NewsDtoPart part2;
	private NewsDtoPart part3;
	private NewsDtoPart part4;
	private NewsDtoPart part5;
	private NewsDtoPart part6;

	public NewsDtoPart getPart0() {
		return part0;
	}

	public void setPart0(NewsDtoPart part0) {
		this.part0 = part0;
	}

	public NewsDtoPart getPart1() {
		return part1;
	}

	public void setPart1(NewsDtoPart part1) {
		this.part1 = part1;
	}

	public NewsDtoPart getPart2() {
		return part2;
	}

	public void setPart2(NewsDtoPart part2) {
		this.part2 = part2;
	}

	public NewsDtoPart getPart3() {
		return part3;
	}

	public void setPart3(NewsDtoPart part3) {
		this.part3 = part3;
	}

	public NewsDtoPart getPart4() {
		return part4;
	}

	public void setPart4(NewsDtoPart part4) {
		this.part4 = part4;
	}

	public NewsDtoPart getPart5() {
		return part5;
	}

	public void setPart5(NewsDtoPart part5) {
		this.part5 = part5;
	}

	public NewsDtoPart getPart6() {
		return part6;
	}

	public void setPart6(NewsDtoPart part6) {
		this.part6 = part6;
	}

	public NewsDtoPart getPart7() {
		return part7;
	}

	public void setPart7(NewsDtoPart part7) {
		this.part7 = part7;
	}

	@Override
	public String toString() {
		return "IndexDto [part0=" + part0 + ", part7=" + part7 + ", part1=" + part1 + ", part2=" + part2 + ", part3="
				+ part3 + ", part4=" + part4 + ", part5=" + part5 + ", part6=" + part6 + "]";
	}

}
