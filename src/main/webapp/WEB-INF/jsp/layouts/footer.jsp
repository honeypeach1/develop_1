<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jspf/tags.jspf" %>

<footer>
    <div class="footer">
        <c:set var="today" value="<%=new java.util.Date()%>" />
        <c:set var="year"><fmt:formatDate value="${today}" pattern="yyyy" /></c:set>
        <c:out value="${year}"/> © 에이스엔 텍스트 파일 변환 프로그램
    </div>
    <!-- footer -->
</footer>