/* globals smfOracle mcsUser mcsPassword Dialog defaultPageAnimation createSliderDrawer isSliderDrawerOpen
reverseDefaultPageAnimation getUnit HeaderBar daysBetween lunchBreakDuration*/
(function() {
    var arrayRequests;
    var pgMyRequests = Pages.pgMyRequests = new SMF.UI.Page({
        name: 'pgMyRequests',
        onKeyPress: pgMyRequests_onKeyPress,
        onShow: pgMyRequests_onShow,
        backgroundImage: 'stripe.png'
    });

    // Creating Slider Drawer
    createSliderDrawer(Pages.pgMyRequests, 'sdSelfService');

    // Creating a repeatbox to show our requests
    var rptApprovalList = new SMF.UI.RepeatBox({
        name: 'rptApprovalList',
        top: getUnit({iOS:64,Android:80}),
        left: '0%',
        width: '100%',
        height: '90%',
        borderWidth: 0,
        showScrollbar: true,
        autoSize: false,
        touchEnabled: true,
        enableScroll: true,
        backgroundTransparent: false,
        enablePullUpToRefresh: false,
        enablePullDownToRefresh: false,
        useActiveItem: false,
        allowDeletingItem: false,
        onSelectedItem: function(e) {
            Pages.pgMyRequestDetail.oRequest = arrayRequests[e.rowIndex];
            Pages.pgMyRequestDetail.show(defaultPageAnimation);
        }
    });

    var imgStatusCircle = new SMF.UI.Image({
        name: 'imgStatusCircle',
        image: 'white_circle.png',
        left: '3%',
        top: getUnit({iOS: ((((Device.screenHeight - 64) / 7) - 60) / 2), Android: 10}),
        width: getUnit(60),
        height: getUnit(60),
        imageFillType: SMF.UI.ImageFillType.ASPECTFIT
    });

    var lblStatusLetter = new SMF.UI.Label({
        name: 'lblStatusLetter',
        text: 'W',
        left: '3%',
        top: getUnit({iOS: ((((Device.screenHeight - 64) / 7) - 60) / 2), Android: 9}),
        width: getUnit(60),
        height: getUnit(60),
        textAlignment: SMF.UI.TextAlignment.CENTER,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: '12pt',
            bold: false
        }),
        fontColor: '#248afd'
    });

    var recVerticalLine = new SMF.UI.Rectangle({
        name: 'recVerticalLine',
        left: getUnit('22%'),
        top: getUnit('17%'),
        width: getUnit(1),
        height: '71%',
        fillColor: '#979797',
        borderWidth: 0,
        roundedEdge: 0
    });

    var lblFullName = new SMF.UI.Label({
        name: 'lblFullName',
        text: '-',
        left: '25%',
        top: getUnit({iOS:'9%',Android:'8%'}),
        width: '60%',
        height: '40%',
        textAlignment: SMF.UI.TextAlignment.LEFT,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: '11pt',
            bold: false
        }),
        fontColor: '#248afd',
        borderWidth: 0
    });


    var lblTeamRole = new SMF.UI.Label({
        name: 'lblTeamRole',
        text: '-',
        left: '25%',
        top: getUnit({iOS:'46%',Android:'40%'}),
        width: '60%',
        height: getUnit({iOS:'20%',Android:'30%'}),
        textAlignment: SMF.UI.TextAlignment.LEFT,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: '7pt',
            bold: false
        }),
        fontColor: '#4a4a4a',
        borderWidth: 0
    });

    var lblLeaveDetails = new SMF.UI.Label({
        name: 'lblLeaveDetails',
        text: '-',
        left: '25%',
        top: '63%',
        width: '60%',
        height: '30%',
        textAlignment: SMF.UI.TextAlignment.LEFT,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: '7pt',
            bold: false
        }),
        fontColor: '#4a4a4a',
        borderWidth: 0
    });

    var imgDetail = new SMF.UI.Image({
        name: 'imgDetail',
        image: 'right_arrow.png',
        left: '88%',
        top: '38%',
        width: '10%',
        height: '30%',
        imageFillType: SMF.UI.ImageFillType.NORMAL
    });

    var recHorizontalLine = new SMF.UI.Rectangle({
        name: 'recHorizontalLine',
        left: getUnit(0),
        top:getUnit({iOS: ((Device.screenHeight - 64) / 7)-1, Android: 79}),
        width: getUnit('100%'),
        height: 1,
        fillColor: '#FFFFFF',
        borderWidth: 0,
        roundedEdge: 0
    });

    //adding files to repeatbox's itemtemplate
    rptApprovalList.itemTemplate.height = getUnit({iOS: (Device.screenHeight - 64) / 7, Android: 80});
    rptApprovalList.itemTemplate.add(imgStatusCircle);
    rptApprovalList.itemTemplate.add(lblStatusLetter);
    rptApprovalList.itemTemplate.add(recVerticalLine);
    rptApprovalList.itemTemplate.add(lblFullName);
    rptApprovalList.itemTemplate.add(lblTeamRole);
    rptApprovalList.itemTemplate.add(lblLeaveDetails);
    rptApprovalList.itemTemplate.add(imgDetail);
    rptApprovalList.itemTemplate.add(recHorizontalLine);
    rptApprovalList.itemTemplate.fillColor = '#e7e7e7';

    //activeItemTemplate
    var imgStatusCircle2 = imgStatusCircle.clone();
    var lblStatusLetter2 = lblStatusLetter.clone();
    var recVerticalLine2 = recVerticalLine.clone();
    var lblFullName2 = lblFullName.clone();
    var lblTeamRole2 = lblTeamRole.clone();
    var lblLeaveDetails2 = lblLeaveDetails.clone();
    var imgDetail2 = imgDetail.clone();
    var recHorizontalLine2 = recHorizontalLine.clone();

    rptApprovalList.itemTemplate.height = getUnit({iOS: (Device.screenHeight - 64) / 7, Android: 80});
    rptApprovalList.activeItemTemplate.add(imgStatusCircle2);
    rptApprovalList.activeItemTemplate.add(lblStatusLetter2);
    rptApprovalList.activeItemTemplate.add(recVerticalLine2);
    rptApprovalList.activeItemTemplate.add(lblFullName2);
    rptApprovalList.activeItemTemplate.add(lblTeamRole2);
    rptApprovalList.activeItemTemplate.add(lblLeaveDetails2);
    rptApprovalList.activeItemTemplate.add(imgDetail2);
    rptApprovalList.activeItemTemplate.add(recHorizontalLine2);
    rptApprovalList.activeItemTemplate.fillColor = '#FFFFFF';

    rptApprovalList.pullDownItem.height = '8%';

    //onRowRender will work for each item bound
    rptApprovalList.onRowRender = function(e) {
        // {
        // 'ID' : 1,
        // 'EmployeeID': '88711203',
        // 'FullName': 'Atakan Eser',
        // 'Email': 'atakan.eser@smartface.io',
        // 'Team': 'UAT Team',
        // 'Role': 'Developer',
        // 'StartDate': '11/16/16',
        // 'EndDate': '11/22/16',
        // 'LeaveType': 'MEDICAL',
        // 'TimeUnit': 'DAY',
        // 'AbsenceMessage': 'I've a planned surgery. Going to be at hospital for 2 weeks.',
        // 'Status': 'approved',
        // 'TotalDays ': 29,
        // 'Used': 16,
        // 'Remaining': 13
        // }

        var startDate = (new Date(arrayRequests[e.rowIndex].StartDate)); 
        var endDate = (new Date(arrayRequests[e.rowIndex].EndDate)) ;
        
        var leaveDetails
        if (arrayRequests[e.rowIndex].TimeUnit === 'DAY') {
            startDate = startDate.format('MM/dd/yyyy');
            endDate = endDate.format('MM/dd/yyyy');
            
            var days = daysBetween(startDate, endDate);
            leaveDetails = days + ' ' + ((days > 1) ? 'days' : 'day');
        }
        else {
            var hours = daysBetween(startDate, endDate, true)  - ((endDate.format('HH') < 13) ? 0 : lunchBreakDuration);
            leaveDetails = hours + ' ' + ((hours > 1) ? 'hours' : 'hour');
            
            startDate = startDate.format('MM/dd/yyyy HH:mm');
            endDate = endDate.format('MM/dd/yyyy HH:mm');
        }
          

        getStatusLetter(arrayRequests[e.rowIndex].Status, this.controls[1]);
        this.controls[3].text = arrayRequests[e.rowIndex].LeaveType;
        this.controls[4].text = startDate + ' - ' + endDate;
        this.controls[5].text = leaveDetails

        getStatusLetter(arrayRequests[e.rowIndex].Status, this.controls[9]);
        this.controls[11].text = arrayRequests[e.rowIndex].LeaveType;
        this.controls[12].text = startDate + ' - ' + endDate;
        this.controls[13].text = leaveDetails
    };

    function getStatusLetter(status, statusObject) {
        // for mock system status may be used as string, 
        // this switch written here to prevent further problems. 
        // if your EBS installation's status type are different, you may just change below lines to fit your configuration.
        switch (status.toUpperCase()) {
            case 'WAITING':
                statusObject.text = 'W';
                statusObject.fontColor = '#248afd';
                break;
            case 'APPROVED':
                statusObject.text = 'A';
                statusObject.fontColor = '#5b9918';
                break;
            case 'REJECTED':
                statusObject.text = 'R';
                statusObject.fontColor = '#ee2736';
                break;
        }
    }

    //adding repeatbox to the page
    pgMyRequests.add(rptApprovalList);

    // If you want, you can add some legend here
    // createLabel(pgMyRequests, 'lblLegend', 'W: Waiting\nA: Approved\nR: Rejected', '5%', '0%', '90%', '10%', SMF.UI.TextAlignment.LEFT, true, '5pt', false, '#979797');

    //adding label for no-data
    var lblNoData = new SMF.UI.Label({
        name: 'lblNoData',
        text: 'You dont have any "Leave Request" yet.',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        textAlignment: SMF.UI.TextAlignment.CENTER,
        multipleLine: true,
        font: new SMF.UI.Font({
            size: '7pt',
            bold: false
        }),
        fontColor: '#4a4a4a',
        borderWidth: 0,
        visible: false
    });
    pgMyRequests.add(lblNoData);

    /**
     * Creates action(s) that are run when the user press the key of the devices.
     * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
     * @this Pages.pgLogin
     */
    function pgMyRequests_onKeyPress(e) {
        if (e.keyCode === 4) {
            Pages.back(reverseDefaultPageAnimation);
        }
    }

    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgLogin
     */
    function pgMyRequests_onShow() {
        // Hiding 'wait' dialog
        Dialog.removeWait();

        // Adding header bar (actionbar for Android, navigationbar for iOS)
        addHeaderBar();

        pgMyRequests.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
        pgMyRequests.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
        pgMyRequests.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;

        displayApprovalRequests();

        // Oracle MCS Analytics logging 
        smfOracle.logAndFlushAnalytics('pgMyRequests_onShow');
        fixOverlayBug();
    }


    // Adding a new navigation or actionbar to the page
    function addHeaderBar() {

        var headerBar = new HeaderBar();
        headerBar.init(Pages.currentPage);

        headerBar.setTitleView(Pages.currentPage, 'My Leave Requests', '#248afd', null, 0, 0, 240, 44, 20);

        // Preparing left items 
        if (Device.deviceOS !== 'Android') {
            var itemMenu = new SMF.UI.iOS.BarButtonItem({
                image: 'menu.png',
                onSelected: function() {
                    (!isSliderDrawerOpen) ? Pages.pgMyRequests.sdSelfService.show(): Pages.pgMyRequests.sdSelfService.hide();
                }
            });

            Pages.currentPage.navigationItem.leftBarButtonItems = [itemMenu];
        }
        else {
            Pages.currentPage.actionBar.displayHomeAsUpEnabled = true;
			Pages.currentPage.actionBar.homeAsUpIndicator = 'menu.png';
        }
    }

    //Parsing storage objects 
    function displayApprovalRequests() {

        /*
        Sample item 
       [
            {
                'ID': 1,
                'EmployeeID': '88711203',
                'FullName': 'Atakan Eser',
                'Email': 'atakan.eser@smartface.io',
                'Avatar' : 'avatar.png',
                'Team': 'UAT Team',
                'Role': 'Developer',
                'StartDate': '11/16/16',
                'EndDate': '11/22/16',
                'LeaveType': 'MEDICAL',
                'TimeUnit': 'DAY',
                'AbsenceMessage': 'I've a planned surgery. Going to be at hospital for 2 weeks.',
                'Status': 'waiting',
                'TotalDays': 29,
                'Used': 16,
                'Remaining': 13
        }]
        */

        var parsedResponse = oRequestList;
        arrayRequests = [];

        for (var i = 0; i < parsedResponse.length; i++) {
            var objRequestObject = {};

            if (parsedResponse[i].EmployeeID === oProfile.EmployeeID) {
                objRequestObject.ID = parsedResponse[i].ID;
                objRequestObject.EmployeeID = parsedResponse[i].EmployeeID;
                objRequestObject.FullName = parsedResponse[i].FullName;
                objRequestObject.Email = parsedResponse[i].Email;
                objRequestObject.Avatar = parsedResponse[i].Avatar;
                objRequestObject.Team = parsedResponse[i].Team;
                objRequestObject.Role = parsedResponse[i].Role;
                objRequestObject.StartDate = parsedResponse[i].StartDate;
                objRequestObject.EndDate = parsedResponse[i].EndDate;
                objRequestObject.LeaveType = parsedResponse[i].LeaveType;
                objRequestObject.TimeUnit = parsedResponse[i].TimeUnit;
                objRequestObject.AbsenceMessage = parsedResponse[i].AbsenceMessage;
                objRequestObject.Status = parsedResponse[i].Status;
                objRequestObject.TotalDays = parsedResponse[i].TotalDays;
                objRequestObject.Used = parsedResponse[i].Used;
                objRequestObject.Remaining = parsedResponse[i].Remaining;

                arrayRequests.push(objRequestObject);
            }
        }


        //binding objects array
        rptApprovalList.closePullItems();
        rptApprovalList.dataSource = arrayRequests;
        rptApprovalList.refresh();
        Dialog.removeWait();

        pgMyRequests.lblNoData.visible = (arrayRequests.length == 0);
        rptApprovalList.visible = !(arrayRequests.length == 0);
    }

})();
