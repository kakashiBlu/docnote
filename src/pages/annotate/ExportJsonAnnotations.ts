import saveAs from "file-saver"
import JSZip from "jszip"
import { WorkspaceAnnotation, WorkspaceDocument } from "storage/database"
import notify from "utils/Notifications"
import { compileFunction } from "vm"

interface JsonOutput {
  entity: string
  start_index: number
  end_index: number
  text: string
  attributes: { [key: string]: string }
}

interface AnnotationOutput2 {
  name: string
  payload: string
}


function insertTextAtIndices(originalString:string, startTag:string, endTag:string, startIndex:number, endIndex:number) {
  startIndex-=1;
  endIndex-=1;
  return (
    
    originalString.slice(0, startIndex) +
    startTag +
    originalString.slice(startIndex, endIndex + 1) +
    endTag +
    originalString.slice(endIndex + 1)
  );
}
async function exportJsonAnnotations(documents: WorkspaceDocument[], annotations: WorkspaceAnnotation[][]): Promise<void> {
  const outputs = [] as AnnotationOutput2[]
  const texts = [] as AnnotationOutput2[]
  documents.forEach((doc, index) => {
    var docinputText = doc.content;
    const output = buildSingleOutput(doc.name, annotations[index])
    const docText = buildSingleOutput2(doc.name, annotations[index],docinputText)
    
    outputs.push(output)
    texts.push(docText)
  })
  
  const tagList = buildTagOutput(annotations)
  saveAsZip(outputs,texts,tagList)
}

function saveAsZip(outputs: AnnotationOutput2[], texts:AnnotationOutput2[] ,tagList : string): void {
  const zip = new JSZip()

  outputs.forEach((output: AnnotationOutput2) => {
    if (output.name && output.payload) {
      zip.file(output.name, output.payload)
    }
  })
  texts.forEach((docText: AnnotationOutput2) => {
    if (docText.name && docText.payload) {
      zip.file(docText.name, docText.payload)
    }
  })
  if(tagList){
    zip.file("Output.csv",tagList)
  }
  zip
    .generateAsync({ type: "blob" })
    .then((content) => saveAs(content, "annotations.zip"))
    .catch((e) => notify.error("Failed to export annotations.", e))
}

function buildSingleOutput(name: string, annotations: WorkspaceAnnotation[]): AnnotationOutput2 {
  return {
    name: name.split(".txt")[0] + ".json",
    payload: buildJsonOutputs(annotations),
  }
}
function buildSingleOutput2(name: string, annotations: WorkspaceAnnotation[], docText:string): AnnotationOutput2 {
  
  return {
    name: name.split(".txt")[0] + ".txt",
    payload: buildFileOutput(annotations,docText),
  }
}
function buildTagOutput(annotations: WorkspaceAnnotation[][]):any {



  const vartagList: { [key: string]: string[] } = {};
    annotations.forEach((annotation, ind) => {
      annotation.forEach((x)=>{
        const { entity, start_index, end_index, text, attributes } = x
        if(!vartagList[entity]) vartagList[entity]=[];
        const formatText = `"${text}"`
        vartagList[entity].push(formatText)
      })
    })
    const csvRows: string[] = [];
    for (const entity in vartagList) {
      const row = `${entity},${vartagList[entity].join(',')}`;
      csvRows.push(row);
    }
  
    return csvRows.join('\n');
  
}


function buildJsonOutputs(annotations: WorkspaceAnnotation[]): string {
  const outputAnnotations: JsonOutput[] = []

  annotations.forEach((annotation: WorkspaceAnnotation) => {
    const { entity, start_index, end_index, text, attributes } = annotation

    const outputAnnotation = {
      entity,
      start_index,
      end_index,
      text,
      attributes,
    } as JsonOutput

    outputAnnotations.push(outputAnnotation)
  })

  return JSON.stringify(outputAnnotations, null, 2)
}

//yeha pe
function buildFileOutput(annotations: WorkspaceAnnotation[], docText : string): string {
  
  // alert(JSON.stringify(annotations, null, 2))
  annotations=annotations.slice().sort((a, b) => {
    var idA = a.start_index;
    var idB = b.start_index;
    if (idA < idB) return 1;
    if (idA > idB) return -1;
    return 0;
  });
  // alert(JSON.stringify(annotations, null, 2))

//   docText=docText.replace(/\s/g, '')

  annotations.forEach((annotation) => {
    const { entity, start_index, end_index, text, attributes } = annotation;
    const startTag = `<${entity}>`;
    const endTag = `</${entity}>`;

    docText = insertTextAtIndices(docText, startTag, endTag, start_index, end_index);
  });

  return docText;
}

export { exportJsonAnnotations }
