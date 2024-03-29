const roles = require('../config/roles');
module.exports = {
    name: 'ruster',
    description: 'This is ruster command.',
    execute(message, args) {

        const action = args.shift();
        const member_roles =  message.member.roles.cache;
        const allowed_roles = [
            roles.rol_alider_id,
            roles.rol_rusterboss_id,
            roles.rol_ruster2_id,
        ];

        const allowed = member_roles.some(role => allowed_roles.includes(role.id));

        if (allowed) {

            let member = message.mentions.users.first();

            switch (action) {

                case '+':
                    if (member) {
                        const memberTarget = message.guild.members.cache.get(member.id);
                        memberTarget.roles.add(roles.rol_ruster1_id).catch(console.error);
                        message.channel.send(`<@${memberTarget.user.id}> ahora es un Ruster!`);
                    } else
                        message.channel.send('¿A quién quieres reclutar para Rusters?');
                    break;

                case '-':
                    if (member) {
                        const memberTarget = message.guild.members.cache.get(member.id);
                        memberTarget.roles.remove(roles.rol_ruster1_id).catch('No existe este rol.');
                        message.channel.send(`<@${memberTarget.user.id}> ya no es un Ruster...`);
                    } else
                        message.channel.send('¿A quién quieres sacar de Rusters?');
                    break;

                default:
            }
        } else {

            const deny_messages = [
                '¿Dónde crees que vas?',
                'Tu no.',
                'Me temo que no.',
                '¿Sabes qué son los permisos?',
            ]

            var reply = deny_messages[Math.floor(Math.random() * deny_messages.length)];

            message.channel.send(reply);
        }

    }
}