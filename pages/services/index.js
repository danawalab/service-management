import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Header from "../../components/Header";
import {Box, FormControl, MenuItem, Select, TextField} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-kuroir";

const useStyles = makeStyles( theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    select: {
        minWidth: 210
    },
    label: {
        marginRight: 20,
        marginTop: 10
    }
}));

// function generate(element) {
//     return [0, 1].map((value) =>
//         React.cloneElement(element, {
//             key: value,
//         }),
//     );
// }

function Services() {
    const classes = useStyles();
    const [server, setServer] = React.useState('ELK1-DEV');
    const [type, setType] = React.useState('container');
    const [variableList, setVariableList] = React.useState([]);
    const [logFileList, setLogFileList] = React.useState([]);
    const yamlEditor = React.useRef(null)
    const startScriptEditor = React.useRef(null)
    const stopScriptEditor = React.useRef(null)

    // aceEditor.current.editor.setValue("")
    // aceEditor.current.editor.clearSelection()

    return (
        <Box className={classes.root}>
            <CssBaseline />
            <Header  active={1} />

            <Container maxWidth={"xl"}>
                <br/>
                <Grid container>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                서비스 추가
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box align={"right"}>
                            <Button style={{margin: 5}} variant={"contained"} color={"primary"}>저장</Button>
                            <Button style={{margin: 5}} variant={"contained"} color={"secondary"}>취소</Button>
                        </Box>
                    </Grid>
                </Grid>

                <Box mt={5}> </Box>

                <Grid container>
                    <Grid item xs={3} sm={1}>
                        <Box align={"right"} className={classes.label}>이름</Box>
                    </Grid>
                    <Grid item xs={9} sm={11}>
                        <Box><TextField autoFocus={true} fullWidth size={"small"} variant={"outlined"} color={"primary"} required={true} /></Box>
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    <Grid item xs={3} sm={1}>
                        <Box align={"right"} className={classes.label}>서버</Box>
                    </Grid>
                    <Grid item xs={9} sm={11}>
                        <Box>
                            <FormControl autoFocus={true} fullWidth size={"small"} variant={"outlined"} color={"primary"} className={classes.select}>
                                <Select
                                    value={server}
                                    onChange={event => setServer(event.target.value)}
                                >
                                    <MenuItem value={"ELK1-DEV"}>ELK1-DEV</MenuItem>
                                    <MenuItem value={"ELK2-DEV"}>ELK2-DEV</MenuItem>
                                    <MenuItem value={"KUBE1"}>KUBE1</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>

                <br/>

                <Grid container>
                    <Grid item xs={3} sm={1}>
                        <Box align={"right"} className={classes.label}>타입</Box>
                    </Grid>
                    <Grid item xs={9} sm={11}>
                        <Box>
                            <FormControl component="fieldset" fullWidth={true}>
                                <RadioGroup value={type} onChange={event => setType(event.target.value)} row={true}>
                                    <FormControlLabel value={"container"} control={<Radio />} label="컨테이너" />
                                    <FormControlLabel value={"process"} control={<Radio />} label="프로세스" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>

                <br/>

                {/*  컨테이너  */}
                <Box display={type === 'container' ? 'block' : 'none'}>
                    <Grid container>
                        <Grid item xs={3} sm={1}>
                            <Box align={"right"} className={classes.label} style={{marginTop: 25}}>변수</Box>
                        </Grid>
                        <Grid item xs={9} sm={11}>
                            <List dense={true}>

                                {
                                    variableList.length === 0 ?
                                        <ListItem>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    <Box align={"right"} className={classes.label}>키</Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField fullWidth size={"small"} variant={"outlined"} color={"primary"} required={true} />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Box align={"right"} className={classes.label}>값</Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField fullWidth size={"small"} variant={"outlined"} color={"primary"} required={true} />
                                                </Grid>
                                            </Grid>

                                            <ListItemSecondaryAction>
                                                <IconButton edge="start" onClick={() => setVariableList(   [...variableList, {} ]  )}>
                                                    <AddBoxIcon/>
                                                </IconButton>

                                                <IconButton edge="end" onClick={() => setVariableList(   [...variableList.slice(1)]  )}>
                                                    <IndeterminateCheckBoxIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        :
                                        variableList.map((variable, index) => {
                                            return (
                                                <ListItem key={index}>
                                                    <Grid container>
                                                        <Grid item xs={1}>
                                                            <Box align={"right"} className={classes.label}>키</Box>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <TextField fullWidth size={"small"} variant={"outlined"} color={"primary"} required={true} />
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <Box align={"right"} className={classes.label}>값</Box>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <TextField fullWidth size={"small"} variant={"outlined"} color={"primary"} required={true} />
                                                        </Grid>
                                                    </Grid>

                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="start" onClick={() => setVariableList(   [...variableList, {} ]  )}>
                                                            <AddBoxIcon/>
                                                        </IconButton>

                                                        <IconButton edge="end" onClick={() => setVariableList(   [...variableList.slice(1)]  )}>
                                                            <IndeterminateCheckBoxIcon/>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        })
                                }
                            </List>
                        </Grid>
                    </Grid>

                    <br />

                    <Grid container>
                        <Grid item xs={3} sm={1}>
                            <Box align={"right"} className={classes.label} style={{marginTop: 0}}>YAML</Box>
                        </Grid>
                        <Grid item xs={9} sm={11}>
                            <Box>
                                <AceEditor
                                    ref={yamlEditor}
                                    mode="yaml"
                                    theme="kuroir"
                                    fontSize="15px"
                                    height={"400px"}
                                    width="100%"
                                    tabSize={2}
                                    placeholder=""
                                    setOptions={{ useWorker: false }}
                                    onChange={() => {}}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/*  프로세스  */}
                <Box display={type === 'process' ? 'block' : 'none'}>
                    {/*<Box mt={2}> </Box>*/}
                    <Grid container>
                        <Grid item xs={3} sm={1}>
                            <Box align={"right"} className={classes.label}>PID 조회</Box>
                        </Grid>

                        <Grid item xs={9} sm={11}>
                            <Box><TextField fullWidth size={"small"} variant={"outlined"} color={"primary"} required={true} placeholder={"ps -ef| grep app.jar |grep -v grep |awk '{print $2}'"} /></Box>
                        </Grid>
                    </Grid>

                    <br />

                    <Grid container>
                        <Grid item xs={3} sm={1}>
                            <Box align={"right"} className={classes.label} style={{marginTop: 0}}>시작<br />스크립트</Box>
                        </Grid>
                        <Grid item xs={9} sm={11}>
                            <Box>
                                <AceEditor
                                    ref={startScriptEditor}
                                    mode="text"
                                    theme="kuroir"
                                    fontSize="15px"
                                    height={"300px"}
                                    width="100%"
                                    tabSize={2}
                                    placeholder=""
                                    setOptions={{ useWorker: false }}
                                    onChange={() => {}}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <br />

                    <Grid container>
                        <Grid item xs={3} sm={1}>
                            <Box align={"right"} className={classes.label} style={{marginTop: 0}}>종료<br />스크립트</Box>
                        </Grid>
                        <Grid item xs={9} sm={11}>
                            <Box>
                                <AceEditor
                                    ref={stopScriptEditor}
                                    mode="text"
                                    theme="kuroir"
                                    fontSize="15px"
                                    height={"300px"}
                                    width="100%"
                                    tabSize={2}
                                    placeholder=""
                                    setOptions={{ useWorker: false }}
                                    onChange={() => {}}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <br/>

                    <Grid container>
                        <Grid item xs={3} sm={1}>
                            <Box align={"right"} className={classes.label} style={{marginTop: 25}}>로그파일</Box>
                        </Grid>
                        <Grid item xs={9} sm={11}>
                            <List dense={true}>
                                {
                                    logFileList.length === 0 ?
                                        <ListItem>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    <Box align={"right"} className={classes.label}>키</Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField fullWidth size={"small"} variant={"outlined"} color={"primary"} required={true} />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Box align={"right"} className={classes.label}>값</Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField fullWidth size={"small"} variant={"outlined"} color={"primary"} required={true} />
                                                </Grid>
                                            </Grid>

                                            <ListItemSecondaryAction>
                                                <IconButton edge="start" onClick={() => setLogFileList(   [...logFileList, {} ]  )}>
                                                    <AddBoxIcon/>
                                                </IconButton>

                                                <IconButton edge="end" onClick={() => setLogFileList(   [...logFileList.slice(1)]  )}>
                                                    <IndeterminateCheckBoxIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        :
                                        logFileList.map((variable, index) => {
                                            return (
                                                <ListItem key={index}>
                                                    <Grid container>
                                                        <Grid item xs={1}>
                                                            <Box align={"right"} className={classes.label}>키</Box>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <TextField fullWidth size={"small"} variant={"outlined"} color={"primary"} required={true} />
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <Box align={"right"} className={classes.label}>값</Box>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <TextField fullWidth size={"small"} variant={"outlined"} color={"primary"} required={true} />
                                                        </Grid>
                                                    </Grid>

                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="start" onClick={() => setLogFileList(   [...logFileList, {} ]  )}>
                                                            <AddBoxIcon/>
                                                        </IconButton>

                                                        <IconButton edge="end" onClick={() => setLogFileList(   [...logFileList.slice(1)]  )}>
                                                            <IndeterminateCheckBoxIcon/>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        })
                                }
                            </List>
                        </Grid>
                    </Grid>

                </Box>

                <br/>
                <br/>
            </Container>
        </Box>
    );
}

export default Services;