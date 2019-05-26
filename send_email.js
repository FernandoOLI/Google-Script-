function send_email()
{
  //Função feita em Google Script para ser usada em um Spreadsheet do Google
  //Objetivo é enviar email para múltiplos contatos com anexo
  //Coluna A: onde está o nome do destinatário
  //Coluna B: endereço de email
  var data = SpreadsheetApp.getActive().getSheetByName('contato').getDataRange().getValues();
  var k = data.length;
  k=k-1;//desconsiderar cabeçalho na planilha
  var userName = getOwnName(); //Retorna o Nome do Usuário ativo
  var file = DriveApp.getFilesByName('NOME_DO_ARQUIVO_NO_DRIVE .EXTENSAO').next().getAs(MimeType.PDF);
  var file1 = DriveApp.getFilesByName('NOME_DO_ARQUIVO_NO_DRIVE .EXTENSAO').next().getAs(MimeType.PDF);

  for (var i = 1; i <= k; i++)
  {
    var name = data[i][0];
    var email = data[i][1];
    var message ='Olá '+name +',\n\n';
    message+= 'Meu nome é '+myName+' sou '+profissao+'.\n';
    message+= 'Continue a msg, \n irá para a linha de baixo ';    
    var subject = 'Inserir o assunto do email';

    MailApp.sendEmail(email, subject, message, { attachments: [file,file1],name: 'o nome que irá aparecer no email do destinatário' });
   }
}

function getOwnName(){
  //Função para retornar o nome do usuário ativo na sheet
  var email = Session.getEffectiveUser().getEmail();
  var self = ContactsApp.getContact(email);
  if (self) {
    var name = self.getGivenName();
    return name;
  }
  else {
    var userName = Session.getEffectiveUser().getUsername();
    return userName;
  }
}