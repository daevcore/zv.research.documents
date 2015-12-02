sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("zv.research.documents.controller.App", {
		onInit: function(){
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setProperty("/Value", "");
			oModel.setProperty("/UploadUrl", "/tmp");
			
			oModel.setProperty("/FileName", "");
			this.getView().setModel(oModel, "DocumentData");
			
			// Check for the various File API support.
			if (window.File && window.FileReader && window.FileList && window.Blob) {
				console.log("Browser compatible for File API!");
			} else {
				console.log("Browser NOT compatible for File API!");
			}
		},
		
		onFileUploaderChange: function(oEvent){
			var oFile = oEvent.getSource().oFileUpload.files[0];
			
			if (oFile) {
				var oFileReader = new FileReader();
				
				oFileReader.onload = function(e) {
					// Do something with the file content (oFileContent) or the file (oFile)
					var oFileContent = e.target.result;
					console.log(oFile.name);
					console.log(oFileContent);
					
					this.getView().getModel("DocumentData").setProperty("/FileName", oFile.name);
					this.getView().getModel("DocumentData").setProperty("/FileType", oFile.type);
					this.getView().getModel("DocumentData").setProperty("/FileSize", oFile.size);
					this.getView().getModel("DocumentData").setProperty("/FileModifiedLast", oFile.lastModifiedDate.toLocaleDateString());
				}.bind(this);
				
				oFileReader.readAsDataURL(oFile);
				//oFileReader.readAsBinaryString(oFile);
				//oFileReader.readAsText(oFile);
				//oFileReader.readAsArrayBuffer(oFile);
				
				/*
				FileReader.readAsBinaryString(Blob|File) - die result-Eigenschaft enthält die Datei-/Blob-Daten als binären String. Jedes Byte wird als Ganzzahl im Bereich [0..255] dargestellt.
				FileReader.readAsText(Blob|File, opt_encoding) - die result-Eigenschaft enthält die Datei-/Blob-Daten als Textstring. Der String wird standardmäßig mit "UTF-8" entschlüsselt. Mit dem optionalen Codierungsparameter können Sie ein anderes Format angeben.
				FileReader.readAsDataURL(Blob|File) - die result-Eigenschaft enthält die Datei-/Blob-Daten verschlüsselt als Data-URL.
				FileReader.readAsArrayBuffer(Blob|File) - die result-Eigenschaft enthält die Datei-/Blob-Daten als ArrayBuffer-Objekt.
				*/
			} else { 
				console.log("Unable to load file!");
			}
		},
		
		onPressUpload: function(oEvent) {
			var oFileUploader = this.getView().byId("idFileUploader");
			// var oFile = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
			//console.log(oFileUploader);
			
			// Do something .....
		},
		
		onUploadComplete: function(oEvent) {
			//console.log(oEvent);
		}
	});

});