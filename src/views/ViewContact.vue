<template>
  <div>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3 class=" h3 text-success fw-bold">View Contact</h3>
        <p class="fst-italic">  There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.</p>
        <p></p>
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
  <div class="container" v-if="!loading && isDone()">
    <div class="row align-items-center">
      <div class="col-md-4">
        <img :src="contact.photo" class="contact-img-big">
      </div>
      <div class="col-md-6">
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
                    <li class="list-group-item">
                      company: <span class="fw-bold">{{contact.company}}</span>
                    </li>
                    <li class="list-group-item">
                      Title: <span class="fw-bold">{{contact.title}}</span>
                    </li>

                    <li class="list-group-item">
                      Group: <span class="fw-bold">{{group.name}}</span>
                    </li>
                  </ul>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <router-link to="/contacts" class="btn btn-success"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
      </div>
    </div>
  </div>
  <div/>
  </div>
</template>

<script>
import { ContactService } from '@/services/ContactService'
import SpinnerC from '@/components/SpinnerC.vue'
export default {
    data: function () {
        return {
            contactId: this.$route.params.contactId,
            loading: false,
            contact: {},
            group: {},
            errorMessage: null
        };
    },
    components: { SpinnerC },

    created: async function () {
        try {
            this.loading = true;
            let response = await ContactService.getContact(this.contactId);
            let groupResponse = await ContactService.getGroup(response.data);
            this.contact = response.data;
            this.group = groupResponse.data;
            this.loading = false;
        }
        catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }
    },

    methods : {
      isDone : function(){
        return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
      }
    }
}
</script>

<style>

</style>