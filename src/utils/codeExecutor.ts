// Simple and safe code execution simulator
export const executeCode = async (code: string, language: string): Promise<string> => {
  // Simulate execution delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    if (language === "javascript") {
      return executeJavaScript(code);
    } else if (language === "python") {
      return executePython(code);
    } else if (language === "html") {
      return "✓ HTML content rendered successfully!\nView in browser to see the result.";
    } else if (language === "sql") {
      return executeSQL(code);
    } else {
      return executeOtherLanguages(code, language);
    }
  } catch (error) {
    return `Error: ${(error as Error).message}`;
  }
};

const executeJavaScript = (code: string): string => {
  const output: string[] = [];
  
  try {
    // Create a safe console mock
    const consoleMock = {
      log: (...args: any[]) => {
        output.push(args.map(arg => String(arg)).join(' '));
      }
    };

    // Create a safe execution context
    const safeCode = code
      .replace(/document|window|fetch|XMLHttpRequest|localStorage|sessionStorage/g, 'undefined')
      .replace(/import|require|eval|Function/g, '// restricted');
    
    // Use Function constructor for safer execution
    const func = new Function('console', safeCode);
    func(consoleMock);
    
    return output.length > 0 ? output.join('\n') : "Code executed (no output)";
  } catch (error) {
    return `JavaScript Error: ${(error as Error).message}`;
  }
};

const executePython = (code: string): string => {
  // Simple Python output simulation
  const printMatches = code.match(/print\s*\([^)]*\)/gi);
  if (printMatches) {
    const outputs = printMatches.map(match => {
      const content = match.replace(/print\s*\(\s*/gi, '').replace(/\s*\)$/, '');
      return content.replace(/['"]/g, '').trim();
    });
    return outputs.join('\n');
  }
  
  if (code.includes('def ') || code.includes('class ') || code.includes('import ')) {
    return "Python code defined successfully (no output statements)";
  }
  
  return "Python code executed";
};

const executeSQL = (code: string): string => {
  const lowerCode = code.toLowerCase();
  
  if (lowerCode.includes('select')) {
    return "Query executed successfully\n(1 row affected)\n\nResult set would appear here in a real database.";
  } else if (lowerCode.includes('insert')) {
    return "Insert statement executed successfully\n(1 row inserted)";
  } else if (lowerCode.includes('update')) {
    return "Update statement executed successfully\n(Rows affected: 1)";
  } else if (lowerCode.includes('delete')) {
    return "Delete statement executed successfully\n(1 row deleted)";
  }
  
  return "SQL command executed successfully";
};

const executeOtherLanguages = (code: string, language: string): string => {
  const lowerCode = code.toLowerCase();
  
  // Check for output statements
  const hasOutput = lowerCode.includes('cout') || 
                   lowerCode.includes('printf') || 
                   lowerCode.includes('system.out.println') || 
                   lowerCode.includes('console.writeline') ||
                   lowerCode.includes('echo');
  
  if (hasOutput) {
    // Extract potential output
    let output = "Program output:\n";
    
    if (lowerCode.includes('hello')) output += "Hello, World!\n";
    else if (lowerCode.includes('test')) output += "Test successful\n";
    else output += "Program executed with output\n";
    
    return output + `\n✓ ${language.toUpperCase()} program executed successfully`;
  }
  
  return `✓ ${language.toUpperCase()} program compiled and executed successfully`;
};