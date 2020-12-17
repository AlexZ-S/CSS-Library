<script>
    export default {
        methods: {
            upRisk() {
                if (this.userInfo.status == 1) {
                    this.fullscreenLoading = false,
                        this.$confirm('您的风险测评已经超过一年, 点击确定重新测评?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                        }).then((action) => {
                            // 执行区域
                            if (action === 'confirm') {
                                this.$router.replace({
                                    path: '/account/risk_test'
                                })
                            }
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消重新测评'
                            });
                        });
                }

            },
        }
    }
</script>