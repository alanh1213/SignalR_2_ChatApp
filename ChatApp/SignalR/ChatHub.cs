using Microsoft.AspNetCore.SignalR;

namespace ChatApp.SignalR.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string usuario, string mensaje)
        {
            await Clients.All.SendAsync("ReceiveMessage", usuario, mensaje);
            
        }
    }
}
