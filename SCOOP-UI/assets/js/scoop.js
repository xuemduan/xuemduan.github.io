function loadExample(exampleName) {
    // 使用Ajax请求加载所选例子的内容并填充到文本框中
    if (exampleName) {
        // 假设例子文件存放在名为 "example" 的文件夹下
        var filePath = "examples/" + exampleName;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("schemaTextarea").value = this.responseText;
            }
        };
        xhttp.open("GET", filePath, true);
        xhttp.send();
    } else {
        // 如果用户选择了空选项，则清空文本框内容
        document.getElementById("schemaTextarea").value = "";
    }
}

function handleFileUpload(input) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const textAreaId = input.id.replace('File', '');
        document.getElementById(textAreaId).value = e.target.result;
    }
    reader.readAsText(file);
}

function translateIt() {

    var formData = new FormData();
    formData.append('xsdFile', document.getElementById('xsdFile').value);
    formData.append('rmlFile', document.getElementById('rmlFile').value);
    formData.append('owlFile', document.getElementById('owlFile').value);
    // var rawDataSchema = document.getElementById('rawDataSchema').value;
    // var rmlMappingRules = document.getElementById('rmlMappingRules').value;
    // var ontologyContent = document.getElementById('ontology').value;

    // Send POST request to backend
    fetch('/translate', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from backend
        console.log('SHACL output:', data);
        // document.getElementById('shaclOutput').innerText = JSON.stringify(data, null, 2);
        document.getElementById('shaclOutput').innerText = data.shacl_output;
        // Update your HTML elements with the SHACL output
    })
    .catch(error => {
        console.error('Error:', error);
    });   
} 