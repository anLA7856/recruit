<%@page language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%pageContext.setAttribute("ctx", request.getContextPath());%>

<%request.setAttribute("tenantPrefix", request.getContextPath());%>
<c:set var="cdnPrefix" value="${ctx}/cdn"/>