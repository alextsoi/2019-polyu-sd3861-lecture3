$(document).ready(function(){
    var ajaxLock = false;
    var taskCompleted = 0;
    var desiredNumberOfTasks = 4;

    var task1LinkPrefix = 'https://raw.githubusercontent.com/';
    var task1LinkSuffix = '/2019-polyu-sd3861-lecture2/master/README.md';

    var task2LinkPrefix = 'https://raw.githubusercontent.com/';
    var task2LinkSuffix = '/2019-polyu-sd3861-lecture2/master/lecture2.md';


    var task3LinkPrefix = 'https://raw.githubusercontent.com/';
    var task3LinkSuffix = '/2019-polyu-sd3861-lecture2/master/docs/index.html';

    var task4LinkPrefix = 'https://raw.githubusercontent.com/';
    var task4LinkSuffix = '/2019-polyu-sd3861-lecture2/master/lecture3.md';


    function taskCompletedCheck(){
        if(desiredNumberOfTasks === taskCompleted){
            ajaxLock = false;
            taskCompleted = 0;
            $('#submit').prop('disabled', false);
        }else{
            console.log('Total: ' + desiredNumberOfTasks);
            console.log('Completed: ' + taskCompleted);
        }
    }

    $('#form').on('submit', function(e){
        if(ajaxLock){
            alert('We are asking GitHub for the results, please wait.');
            return;
        }
        e.preventDefault();
        var githubAccount = $.trim($('#github_account').val());
        if(githubAccount === ''){
            alert('Please check your github account name');
            return;
        }

        ajaxLock = true;
        $('#submit').prop('disabled', true);


        $('#result1').text('');
        $('#result1_status').html('');
        $('#result1_detail').html('');
        $('#result2').text('');
        $('#result2_status').html('');
        $('#result2_detail').html('');
        $('#result3').text('');
        $('#result3_status').html('');
        $('#result3_detail').html('');
        $('#result4').text('');
        $('#result4_status').html('');
        $('#result4_detail').html('');

        var task1Url = task1LinkPrefix + githubAccount + task1LinkSuffix;
        // Task 1
        $.ajax({
            method: 'GET',
            url: task1Url,
            success: function(data){
                var textString = $.trim(data);
                textString = textString.toLowerCase();

                taskCompleted++;
                taskCompletedCheck();
                $('#result1').text(data);
                if(textString === 'lecture 2'){
                    $('#result1_status').html('<span class="badge badge-success">Success</span>');
                }else{
                    $('#result1_status').html('<span class="badge badge-danger">Oops</span>');
                }
                $('#result1_detail').html('<a href="' + task1Url + '" target="_blank" class="badge badge-info">Link</a>');
            },
            error: function(){
                taskCompleted++;
                taskCompletedCheck();
                $('#result1').text('');
                $('#result1_status').html('<span class="badge badge-danger">Oops</span>');
                $('#result1_detail').html('<a href="' + task1Url + '" target="_blank" class="badge badge-info">Link</a>');

            }
        });

        var task2Url = task2LinkPrefix + githubAccount + task2LinkSuffix;
        // Task 2
        $.ajax({
            method: 'GET',
            url: task2Url,
            success: function(data){
                var textString = $.trim(data);
                textString = textString.toLowerCase();

                taskCompleted++;
                taskCompletedCheck();
                $('#result2').text(data);
                $('#result2_status').html('<span class="badge badge-success">Success</span>');
                $('#result2_detail').html('<a href="' + task2Url + '" target="_blank" class="badge badge-info">Link</a>');
            },
            error: function(response){
                if(response.status == 404){
                    $('#result2').text('Note: lecture2.md is not found.');
                }
                taskCompleted++;
                taskCompletedCheck();
                $('#result2_status').html('<span class="badge badge-danger">Oops</span>');
                $('#result2_detail').html('<a href="' + task2Url + '" target="_blank" class="badge badge-info">Link</a>');
            }
        });

        var task3Url = task3LinkPrefix + githubAccount + task3LinkSuffix;
        // Task 3
        $.ajax({
            method: 'GET',
            url: task3Url,
            success: function(data){
                var textString = $.trim(data);
                textString = textString.toLowerCase();

                taskCompleted++;
                taskCompletedCheck();
                $('#result3').text(data);
                $('#result3_status').html('<span class="badge badge-success">Success</span>');
                $('#result3_detail').html('<a href="' + task3Url + '" target="_blank" class="badge badge-info">Link</a>');
            },
            error: function(response){
                if(response.status == 404){
                    $('#result3').text('Note: lecture2.md is not found.');
                }
                taskCompleted++;
                taskCompletedCheck();
                $('#result3_status').html('<span class="badge badge-danger">Oops</span>');
                $('#result3_detail').html('<a href="' + task3Url + '" target="_blank" class="badge badge-info">Link</a>');
            }
        });

        // Task 4
        var task4Url = task4LinkPrefix + githubAccount + task4LinkSuffix;
        $.ajax({
            method: 'GET',
            url: task4Url,
            success: function(data){
                var textString = $.trim(data);
                textString = textString.toLowerCase();

                taskCompleted++;
                taskCompletedCheck();
                $('#result4').text(data);
                $('#result4_status').html('<span class="badge badge-success">Success</span>');
                $('#result4_detail').html('<a href="' + task4Url + '" target="_blank" class="badge badge-info">Link</a>');
            },
            error: function(response){
                if(response.status == 404){
                    $('#result4').text('Note: lecture3.md is not found.');
                }
                taskCompleted++;
                taskCompletedCheck();
                $('#result4_status').html('<span class="badge badge-danger">Oops</span>');
                $('#result4_detail').html('<a href="' + task4Url + '" target="_blank" class="badge badge-info">Link</a>');
            }
        });
    });
});