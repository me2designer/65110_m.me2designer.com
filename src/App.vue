<template>
    <div id="wrap" data-target-device="mo" style="visibility:hidden;opacity:0">
        <Header/>        
        <Main/>
        <Footer/>
    </div>
</template>

<script>
import Header from './components/layout/Header.vue';
import Main from './components/Main.vue';
import Footer from './components/layout/Footer.vue';

export default {
    name: 'wrap',
    components: {
        Header,
        Main,
        Footer,
    }
}
</script>