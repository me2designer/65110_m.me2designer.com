<template>
    <div id="header">
        <div class="inner">
            <h1 class="logo">
                <a class="link_home" href="/" title="메인으로 이동하기"><img src="/img/logo/me2designer-symbol.svg" alt="로고"><span class="lh-10">포트폴리오</span></a>
            </h1>
            <nav class="gnb d-none">
                <button class="btn_gnb" data-target="#visual" type="button">1분 자기소개 영상</button>
                <button class="btn_gnb" data-target="#profile" type="button">성장과정</button>
                <button class="btn_gnb" data-target="#project" type="button">프로젝트 소개</button>
                <button class="btn_gnb" data-target="#professional" type="button">경력개발</button>
                <button class="btn_gnb" data-target="#career" type="button">근무이력</button>
                <button class="btn_gnb" data-target="#blog" type="button">코딩블로그</button>                
            </nav>
        </div>
    </div>
</template>



<script>
export default {

}
</script>



<style lang="scss">
    $imgPath : "/img/common/";

    #header {
        position:fixed;
    }
</style>