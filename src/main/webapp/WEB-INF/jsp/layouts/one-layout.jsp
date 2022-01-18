<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jspf/tags.jspf" %>

<!DOCTYPE html>
<html lang="ko">
<div id="header">
    <tiles:insertAttribute name="header" />
</div>
<div id="content">
    <tiles:insertAttribute name="content" />
</div>
<%--<div id="footer">
    <tiles:insertAttribute name="footer" />
</div>--%>
</html>