import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { 
    Typography, 
    Button,
    Grid,
    Card,
    CardHeader,
    Divider,
    Box,
    CardContent,
    createMuiTheme

} from '@material-ui/core';
import { ConfirmDialog } from 'alerts';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    textWarning: {
        paddingBottom: theme.spacing(1),
        '& >p' : {
          color: '#546e7ad9'
        }
      },
  }));

  const themeButtonDelete = createMuiTheme({
    palette: {
      primary : {
        main: '#f44336',
        contrastText: '#fff',
      },
    },
  });

const LimitProduct = props => {

    const { isStop, closePost, distroyPost, openPost, ...rest } = props;

    const classes = useStyles();

    const [ openBlock, setOpenBlock ] = useState(false);
    const [ openOpen, setOpenOpen ] = useState(false);
    const [ openDistroy, setOpenDistroy ] = useState(false);

    const handleBlocking = () => closePost();
    const handleOpening = () => openPost();
    const handleDistroyPost = () => distroyPost();

    return (
        <React.Fragment>
            <Grid 
                item 
                xs={12} 
                sm={4}
            >
                <Card>
                    <CardHeader title="Hạn chế bài viết" />
                    <Divider/>
                    <CardContent>
                        <Box>
                            {
                            isStop
                            ?
                            <Button 
                                startIcon={ <LockOpenIcon fontSize="small" />}
                                onClick={ ()=>setOpenOpen(!openOpen) }
                            >
                                ĐĂNG LẠI BÀI
                            </Button>
                            :
                            <Button 
                                startIcon={ <NotInterestedIcon fontSize="small" />}
                                onClick={ ()=>setOpenBlock(!openBlock) }
                            >
                                DỪNG ĐĂNG BÀI
                            </Button>
                            }
                        </Box>
                        <Box className={ classes.textWarning}>
                            <Typography variant="body2" color="textSecondary">
                                Xóa toàn bộ dữ liệu của bài viết, nếu không chắc chắn bạn hãy chọn dừng đăng bài vì điều này sẽ xóa không trở lại.
                            </Typography>
                        </Box>
                        <ThemeProvider theme={themeButtonDelete}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                startIcon={ <DeleteOutlinedIcon fontSize="small" />}
                                onClick={ ()=>setOpenDistroy(!openDistroy) }
                            >
                                XÓA BÀI VIẾT
                            </Button>
                        </ThemeProvider>
                    </CardContent>
                </Card>
            </Grid>
            <ConfirmDialog action={ handleBlocking } openDialog={openBlock} content={{type:'denied', title:'Dừng đăng bài', note:`Bài viết sẽ mất quyền phê duyệt? Bạn có thể cấp lại quyền phê duyệt để được đăng bài trở lại.`}} />
            <ConfirmDialog action={ handleOpening } openDialog={openOpen} content={{type:'approve', title:'Đăng bài trở lại', note:`Bài viết sẽ được cấp lại quyền phê duyệt và tự động được đăng?`}} />
            <ConfirmDialog action={ handleDistroyPost } openDialog={openDistroy} content={{type:'delete', title:'Xóa dữ liệu bài viết', note:`Bài viết sẽ bị xóa hoàn toàn trên hệ thống, thực thi sẽ không khôi phục được. Bạn có chắc?`}}/>
        </React.Fragment>
    );
};

LimitProduct.propTypes = {
    isStop: PropTypes.bool,
    closePost: PropTypes.func,
    openPost: PropTypes.func,
    distroyPost: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
    return {
        isStop: state.dataPostDetail.limitInfo.isStop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closePost: () => {
            dispatch({
                type: "CLOSE_POST",
            })
        },
        openPost: () => {
            dispatch({
                type: "OPEN_POST",
            })
        },
        distroyPost: () => {
            dispatch({
                type: "DESTROY_POST",
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LimitProduct)