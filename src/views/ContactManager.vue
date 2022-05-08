<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold">
            Contact Manager
            <router-link to="/contacts/add" class="btn btn-success btn-sm mx-4"
              ><i class="fa fa-plus"></i> New
            </router-link>
          </p>
          <p class="mt-3">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text.
          </p>
          <form>
            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search Name"
                    />
                  </div>
                  <div class="col">
                    <input type="submit" class="btn btn-outline-dark" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- //* Spinner  // -->
    <div class="container" v-if="loading">
      <div class="row">
        <div class="col">
          <SpinnerC/>
        </div>
      </div>
    </div>
    <!-- //* Error Message // -->
    <div v-if="!loading &&  errorMessage">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h4 text-danger fw-bold">{{errorMessage}}</p>
        </div>
      </div>
    </div>
    </div>
    <div class="container mt-3" v-if="contacts.length > 0">
      <div class="row">
        <div class="col-md-6" v-for="contact in contacts" :key="contact.id">
          <div class="card my-3 list-group-item-success shadow-lg" >
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-sm-4">
                  <img
                    :src="contact.photo"
                    alt="Contact Image"
                    class="contact-img"
                  />
                </div>
                <div class="col-sm-7">
                  <ul class="list-group">
                    <li class="list-group-item">
                      Name: <span class="fw-bold">{{contact.name}}</span>
                    </li>
                    <li class="list-group-item">
                      Email: <span class="fw-bold">{{contact.email}}</span>
                    </li>

                    <li class="list-group-item">
                      Mobile: <span class="fw-bold">{{contact.mobile}}</span>
                    </li>
                  </ul>
                </div>
                <div
                  class="col-sm-1 d-flex flex-column justify-content-center align-items-center"
                >
                  <router-link
                    :to="`/contacts/view/${contact.id}`"
                    class="btn btn-warning my-1"
                  >
                    <i class="fa fa-eye"></i>
                  </router-link>
                  <router-link
                    :to="`/contacts/edit/${contact.id}`"
                    class="btn btn-primary my-1"
                  >
                    <i class="fa fa-pen"></i>
                  </router-link>
                  <button class="btn btn-danger my-1" @click="clickDeleteContact(contact.id)">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContactService } from "@/services/ContactService";
import SpinnerC from "@/components/SpinnerC.vue";
export default {
    data: function () {
        return {
            loading: false,
            contacts: [],
            errorMessage: null,
        };
    },
    components: { SpinnerC },

    created: async function () {
        try {
            this.loading = true;
            let response = await ContactService.getAllContacts();
            this.contacts = response.data;
            this.loading = false;
        }
        catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }
    },
    methods: {
      clickDeleteContact : async function(contactId){
        try {
             this.loading = true;
          let response = await ContactService.deleteContact(contactId)
          if(response){
            let response = await ContactService.getAllContacts();
            this.contacts = response.data;
            this.loading = false;
          }
          
        } catch (error) {
           this.errorMessage = error;
            this.loading = false;
        }
      }
    },
};
</script>

<style></style>
