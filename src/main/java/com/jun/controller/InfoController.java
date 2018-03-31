package com.jun.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.mapper.RolePermissionMapper;
import com.jun.mapper.RoleUserMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.User;
import com.jun.utils.CommonUtil;
import com.jun.utils.MD5Util;

/**
 * 用户公有的controller，信息修改
 * @author jun
 * @date 2018年3月31日 : 上午10:04:37
 *
 */
@Controller
@RequestMapping("/info")
@EnableWebMvc
public class InfoController {
	
	@Autowired
	UserMapper userMapper;
	@Autowired
	RolePermissionMapper rolePermissionMapper;
	@Autowired
	RoleUserMapper roleUserMapper;
	
	
	/**
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(Model model, HttpServletRequest request) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);
		return "/info/index";
	}
	
	
	@RequestMapping(value = "/update-person-info", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String updatePersonInfo(Model model, HttpServletRequest request, String name, String telephone,
			String username) {
		if (!CommonUtil.checkIfNull(name, telephone, username)) {
			return "error,paramer not null";
		}
		if (!SecurityContextHolder.getContext().getAuthentication().getName().equals(username)) {
			throw new AccessDeniedException("没有权限");
		}
		int result = userMapper.updateNameAndTelephoneByUserName(name, telephone, username);
		if (result == 1) {
			return "修改成功";
		} else {
			return "修改失败";
		}
	}
	
	
	/**
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/modify-password", method = RequestMethod.POST,produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String modifyPassword(Model model,HttpServletResponse response, HttpServletRequest request,String oldPassword,String newPassword) {
		if(!CommonUtil.checkIfNull(oldPassword,newPassword)){
			return "error";
		}
		String concurrentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		newPassword = MD5Util.encode(newPassword);
		oldPassword = MD5Util.encode(oldPassword);
		
		int result = userMapper.updatePasswordByUsername(newPassword, concurrentUsername, oldPassword);
		
		if(result == 1){
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    	if (auth != null){    
	    	    new SecurityContextLogoutHandler().logout(request, response, auth);
	    	}
	    	return "ok";
		}else{
			return "修改失败";
		}

	}
	
    @RequestMapping(value="/view-modify-password", method = RequestMethod.GET)
    public String viewModifyPassword(Model model, HttpServletRequest request){
    	String concurrentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(concurrentUsername);
		model.addAttribute("user", user);
    	return "/info/view-modify-password";
    }
    
    
    @RequestMapping(value="/view-change-pic", method = RequestMethod.GET)
    public String viewChangePic(Model model, HttpServletRequest request){
    	String concurrentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(concurrentUsername);
		model.addAttribute("user", user);
    	return "/info/view-change-pic";
    }
    
    
    
    @RequestMapping(value="/change-pic", method = RequestMethod.POST)
    public String changePic(Model model, HttpServletRequest request,
            @RequestParam("file") MultipartFile file) throws IllegalStateException, IOException{
    	String concurrentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(concurrentUsername);
		model.addAttribute("user", user);
        if(!file.isEmpty()) {
            //上传文件路径
            String path = request.getServletContext().getRealPath("/headPicLocation/");
            //上传文件名
            String filename = file.getOriginalFilename();
            
            if(!(filename.endsWith(".jpg")||filename.endsWith("jpeg")||filename.endsWith(".png"))){
            	model.addAttribute("info", "文件格式不正确！");
                return "/info/view-change-pic";
            }
            
            File filepath = new File(path,filename);
            //判断路径是否存在，如果不存在就创建一个
            if (!filepath.getParentFile().exists()) { 
                filepath.getParentFile().mkdirs();
            }
            //将上传文件保存到一个目标文件当中
            file.transferTo(new File(path + File.separator + filename));
            //往user表中插入一份数据。
            userMapper.updatePicByUsername(filename, concurrentUsername);
            return "redirect:/info/view-change-pic";
        } else {
        	model.addAttribute("info", "上传失败！");
            return "/info/view-change-pic";
        }
    }
}
