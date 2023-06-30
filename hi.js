var processUsesrs = function(callback) {
    getAllUsers(function(err, users) {
        async.forEach(users, function(user, callback) {
            getContactsOfUser(users.userId, function(err, contacts) {
                async.forEach(contacts, function(contact, callback) {
                    getPhonesOfContacts(contacts.contactId, function(err, phones) {
                        contact.phones = phones;
                        callback();
                    });
                }, function(err) {
                    // All contacts are processed
                    user.contacts = contacts;
                    callback();
                });
            });
        }, function(err) {
            // All users are processed
            // Here the finished result
            callback(undefined, users);
        });
    });
};

processUsers(function(err, users) {
    // users here
});
