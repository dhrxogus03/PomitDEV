<?xml version="1.0" encoding="UTF-8" ?>

<!-- 
         Support of iCAD is not provided by DS, it's requiring Elysium partnership
	This operation is executed post installation of 3DEXPERIENCE On Premise Server (strictly by Administrator).
	Place the XML in the below location and restart the 3DSpace server : 
		${MATRIXINSTALL}/STAGING/ematrix/WEB-INF/resources/DerivedOutput/
	This Functionality will be available on R2023xFD05
	
	EDIT  Nov 29th 2023: Finally Elysium changed the casse for naming this CAD : previously, everly was swriting 'iCAD' (lower i)
	but Elysium deliver their cap file and their lateType to implement converter with using 'ICAD' (upper I)
	As a consequence, we must align the 'source name' in this declarative file
-->

<derivedformatmanagement xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="DerivedFormatDeclarative.xsd">
	<converter name="Elysium" synchronous="false" nlsFile="emxDerivedFormatManagementElysiumStringResource">
		<datasources>
			<datasource name="3DEXPERIENCE">
				<source name="CATPart" type="Part">
					<!-- CATPart to ICD-->
					<target name="ICAD" inputStreamId="authoring" outputStreamId="ICAD" downloadable="true" >					
						<parameter name="Extension" values="icd" type="enum" default="icd" description="Elysium 3DEXP to iCAD" mandatory="true"/>
					</target>
					
				</source>
                
				<events>
					<event name="checkin"	type="Trigger" />
					<event name="promote"	type="Trigger"	maturityGraph="lifecycle" />
					<event name="ondemand" />
				</events>
			</datasource>
			
			<datasource name="CATIAV5">
				<source name="CATPart" type="Part">					
					<!-- CATPart to ICD-->
					<target name="ICAD" inputStreamId="authoring" outputStreamId="ICAD" downloadable="true" >					
						<parameter name="Extension" values="icd" type="enum" default="icd" description="Elysium V5 to iCAD" mandatory="true"/>
					</target>
				</source>
                
				<events>
					<event name="promote"	type="Trigger"	maturityGraph="lifecycle" />
					<event name="ondemand" />
					<!-- planned in 23xFD01 -->
					<!-- <event name="onXCADSave" /> -->
				</events>
			</datasource>
			
            <!-- Kobe Steel Project, : intially planned in 23xFD03, 			-->	
			<datasource name="ICAD">          
				<source name="ICAD" type="Part">					
					<target name="CGR" inputStreamId="authoring" outputStreamId="authoringvisu" downloadable="false" >
						<parameter name="Extension" values="icd" type="enum" default="icd" description="Elysium iCAD to visu" mandatory="true"/>
					</target>
					<!--
					<target name="CATPart" inputStreamId="authoring" outputStreamId="CATPart" downloadable="true" >
						<parameter name="Extension" values="icd" type="enum" default="icd" description="Elysium iCAD to pivot CV5 CATPart" mandatory="true"/>
					</target>
					-->
				</source>
                				
				<events>
					<event name="promote"	type="Trigger"	maturityGraph="lifecycle" />
					<event name="ondemand" />
					<event name="onXCADSave" />
				</events>
			</datasource>
		
			
            		 
		</datasources>
	</converter>

    <!-- specifically for iCAD , I declare some Std DFC possibilities for drawing-->
	<converter name="3DEXPERIENCE" synchronous="false" nlsFile="emxDerivedFormatManagementStringResource" comment="all the conversion managed asynchronously by DS, By DerivedFormatConverter (OnTheEdge DO converter) or Conversion Service" >
		<datasources>
			<!-- Kobe Steel Project, 22xFD07/23xFD02 and icd 'Drawing' to UDL/PDF-->
			<datasource name="ICAD">          
				<source name="icd" type="Drawing">					
					<target name="UDL"  inputStreamId="DWG" outputStreamId="authoringvisu" downloadable="false" >					
					</target>
					<target name="PDF"  inputStreamId="authoringvisu" outputStreamId="*" downloadable="true" > <!-- this one is a 2nd step conversion -->
						<parameter name="PDFSaveMode"          values="PDF_1_3|PDF_A_1b|PDF_1_6" type="enum" default="PDF_1_3" description="PDF version to use" mandatory="true"/>
				    </target>
                </source>
				
				<events>
					<event name="promote"	type="Trigger"	maturityGraph="lifecycle" />
					<event name="ondemand" />
					<event name="onXCADSave" />
				</events>
			</datasource>		

		</datasources>
	</converter>
     
</derivedformatmanagement>
